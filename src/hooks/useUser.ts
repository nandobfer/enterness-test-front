import { useContext } from "react"
import UserContext from "../contexts/userContext"
import { useNavigate } from "react-router-dom"
import { WebTokens } from "../backend"

export const useUser = () => {
    const { dto, setDto, jwt, saveTokens, socket } = useContext(UserContext)
    const navigate = useNavigate()

    const onLogin = (tokens: WebTokens) => {
        saveTokens(tokens)
        setTimeout(() => navigate("/rooms"))
    }

    return { dto, onLogin, socket }
}
