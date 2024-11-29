import {  useContext } from "react"
import UserContext from "../contexts/userContext"
import { User, UserForm } from "../types/class/User"
import { api } from "../backend"

export const useUser = () => {
    const context = useContext(UserContext)

    class UserHelper {
        current: User | null = context.user

        set(data: User | null) {
            this.current = data
            context.setUser(data)
        }

        async checkUsername(username: string) {
            const response = await api.get('/users/username', {params: {username}})
            const is_valid = response.data.valid as boolean
            return is_valid
        }

        async login(username: string) {
            const data: UserForm = {username}
            const response = await api.post('/users', data)
            const user = response.data as User
            return user
        }

    } 

    return { user: new UserHelper() }
}
