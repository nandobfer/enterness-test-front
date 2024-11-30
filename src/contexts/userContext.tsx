import { createContext, useEffect, useState } from "react"
import React from "react"
import { User } from "../types/class/User"
import { useIo } from "../hooks/useIo"

interface UserContextValue {
    user: User | null
    setUser: (user: User | null) => void
}

interface UserProviderProps {
    children: React.ReactNode
}

const UserContext = createContext<UserContextValue>({} as UserContextValue)

export default UserContext

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const io = useIo()

    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        io.on("disconnect", () => {
            setUser(null)
        })

        return () => {
            io.off("disconnect")
        }
    }, [])

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}
