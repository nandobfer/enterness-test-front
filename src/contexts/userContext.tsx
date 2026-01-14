import { createContext, useEffect, useRef, useState } from "react"
import React from "react"
import { UserDto } from "../types/src/users/users.entity"
import { io, Socket } from "socket.io-client"
import { api, handleInterceptions, hostname, JwtPayload, JwtWithTokens, WebTokens } from "../backend"
import { useSnackbar } from "burgos-snackbar"
import { jwtDecode } from "jwt-decode"

interface UserContextValue {
    dto: UserDto | null
    setDto: React.Dispatch<React.SetStateAction<UserDto | null>>

    jwt: React.MutableRefObject<JwtWithTokens | null>
    saveTokens: (tokens: WebTokens) => void
}

interface UserProviderProps {
    children: React.ReactNode
}

const UserContext = createContext<UserContextValue>({} as UserContextValue)

export default UserContext

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const socketRef = useRef<Socket | null>(null)
    const { snackbar } = useSnackbar()

    const [dto, setDto] = useState<UserDto | null>(null)
    const jwt = useRef<JwtWithTokens | null>(null)

    const saveTokens = (tokens: WebTokens) => {
        const decrypedAccessToken = jwtDecode<JwtPayload & { user: UserDto }>(tokens.access_token)
        const decrypedRefreshToken = jwtDecode<JwtPayload & { user: UserDto }>(tokens.refresh_token)
        console.log(decrypedAccessToken)
        jwt.current = {
            access_token: { token: tokens.access_token, iat: decrypedAccessToken.iat, exp: decrypedAccessToken.exp },
            refresh_token: { token: tokens.refresh_token, iat: decrypedRefreshToken.iat, exp: decrypedRefreshToken.exp },
        }
        setDto(decrypedAccessToken.user)
    }

    const clearData = () => {
        jwt.current = null
        setDto(null)
    }

    useEffect(() => {
        if (jwt.current) {
            handleInterceptions(jwt, saveTokens, clearData)
            socketRef.current = io("ws://" + hostname, { auth: { token: jwt.current?.access_token } })
            const socket = socketRef.current

            socket.once("connect_error", () => {
                snackbar({ severity: "error", text: "Não foi possível se conectar com o servidor, verifique sua conexão com a internet" })
            })

            socket.on("connect", () => {
                // snackbar({ severity: "success", text: "Conectado com o servidor" })
            })

            socket.on("disconnect", (reason) => {
                if (reason == "io client disconnect" || reason == "io server disconnect") {
                    // snackbar({ severity: "info", text: "Desconectado do servidor" })
                } else {
                    snackbar({ severity: "error", text: "Conexão com o servidor perdida! Tentando reconectar automaticamente" })
                }
            })

            socket.onAny((...args) => {
                console.log(args)
            })

            return () => {
                api.interceptors.request.clear()
                socket.off("connect_error")
                socket.off("connect")
                socket.off("disconnect")
                socket.offAny()
            }
        } else {
            setDto(null)
        }
    }, [jwt.current])

    return (
        <UserContext.Provider
            value={{
                dto,
                setDto,
                jwt,
                saveTokens,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}
