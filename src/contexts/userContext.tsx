import { createContext, useEffect, useRef, useState } from "react"
import React from "react"
import { io, Socket } from "socket.io-client"
import { api, handleInterceptions, hostname, JwtPayload, JwtWithTokens, WebTokens } from "../backend"
import { useSnackbar } from "burgos-snackbar"
import { jwtDecode } from "jwt-decode"
import { UserDto } from "../types/users/users.entity"

interface UserContextValue {
    dto: UserDto | null

    clearData: () => void

    jwt: React.RefObject<JwtWithTokens | null>
    saveTokens: (tokens: WebTokens) => void
    socket: Socket
}

interface UserProviderProps {
    children: React.ReactNode
}

const UserContext = createContext<UserContextValue>({} as UserContextValue)

export default UserContext

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const { snackbar } = useSnackbar()

    const [dto, setDto] = useState<UserDto | null>(null)
    const jwt = useRef<JwtWithTokens | null>(null)
    const socket = useRef<Socket>(io("ws://" + hostname, { autoConnect: false })).current

    const saveTokens = (tokens: WebTokens) => {
        const decrypedAccessToken = jwtDecode<JwtPayload & { user: UserDto }>(tokens.access_token)
        const decrypedRefreshToken = jwtDecode<JwtPayload & { user: UserDto }>(tokens.refresh_token)
        jwt.current = {
            access_token: { token: tokens.access_token, iat: decrypedAccessToken.iat, exp: decrypedAccessToken.exp },
            refresh_token: { token: tokens.refresh_token, iat: decrypedRefreshToken.iat, exp: decrypedRefreshToken.exp },
        }
        setDto(decrypedAccessToken.user)
    }

    const initSocket = async () => {
        if (socket.connected) return socket

        socket.auth = { token: jwt.current?.access_token.token }
        socket.connect()

        socket.once("connect_error", () => {
            snackbar({ severity: "error", text: "Não foi possível se conectar com o servidor, verifique sua conexão com a internet" })
        })

        socket.on("connect", () => {
            snackbar({ severity: "success", text: "Conectado com o servidor" })
        })

        socket.on("disconnect", (reason) => {
            if (reason == "io client disconnect" || reason == "io server disconnect") {
                snackbar({ severity: "info", text: "Desconectado do servidor" })
            } else {
                snackbar({ severity: "error", text: "Conexão com o servidor perdida! Tentando reconectar automaticamente" })
            }
        })

        return socket
    }

    const clearData = () => {
        jwt.current = null
        setDto(null)
        socket.disconnect()
    }

    useEffect(() => {
        if (jwt.current) {
            handleInterceptions(jwt, saveTokens, clearData)
            initSocket()

            return () => {
                api.interceptors.request.clear()
            }
        } else {
            setDto(null)
        }
    }, [jwt.current])

    useEffect(() => {
        return () => {
            socket.off("connect_error")
            socket.off("connect")
            socket.off("disconnect")
            socket.offAny()
        }
    }, [])

    return (
        <UserContext.Provider
            value={{
                dto,
                clearData,
                jwt,
                saveTokens,
                socket,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}
