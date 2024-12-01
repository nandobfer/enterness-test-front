import { useNavigate } from "react-router-dom"
import { Chat } from "../types/class/Chat"

export const useChat = () => {
    const navigate = useNavigate()

    const join = (chat: Chat) => {
        navigate("/chat", { state: { chat } })
    }

    return { join }
}
