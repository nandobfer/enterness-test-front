import {  useContext } from "react"
import UserContext from "../contexts/userContext"
import { User, UserForm } from "../types/class/User"
import { api } from "../backend"
import { Chat, ChatForm } from "../types/class/Chat"
import { useIo } from "./useIo"

export const useUser = () => {
    const context = useContext(UserContext)
    const io = useIo()

    class UserHelper {
        current: User | null = context.user

        set(data: User | null) {
            this.current = data
            context.setUser(data)
        }

        async checkUsername(username: string) {
            const response = await api.get("/users/username", { params: { username } })
            const is_valid = response.data.valid as boolean
            return is_valid
        }

        async login(username: string) {
            const data: UserForm = { username }

            const promise: Promise<User> = new Promise((resolve) => {
                io.emit("users:login", data, (user: User) => resolve(user))
            })

            return promise
        }

        async createChat(data: ChatForm) {
            const response = await api.post("/chats", data)
            const chat = response.data as Chat
            return chat
        }

        async getChats() {
            const response = await api.get("/chats/user", { params: { user_id: this.current?.id } })
            const chats = response.data as Chat[]
            return chats
        }
    }

    return { user: new UserHelper() }
}
