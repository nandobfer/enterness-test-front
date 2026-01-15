import { useContext } from "react"
import UserContext from "../contexts/userContext"
import { useNavigate } from "react-router-dom"
import { WebTokens } from "../backend"

export const useUser = () => {
    const { dto, clearData, saveTokens, socket } = useContext(UserContext)
    const navigate = useNavigate()

    const onLogin = (tokens: WebTokens) => {
        saveTokens(tokens)
        setTimeout(() => navigate("/rooms"))
    }

    const logout = () => {
        clearData()
        navigate("/")
    }

    return { dto, onLogin, logout, socket }
}
