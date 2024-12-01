import { useNavigate } from "react-router-dom"
import { Chat, ChatJoinForm } from "../types/class/Chat"
import { useEffect, useState } from "react"
import { Message } from "../types/class/Message"
import { useIo } from "./useIo"
import { useUser } from "./useUser"
import { api } from "../backend"

export const useChat = (initialChat: Chat) => {
    const navigate = useNavigate()
    const io = useIo()
    const { user } = useUser()

    const [chat, setChat] = useState(initialChat)

    const join = (chat: Chat) => {
        navigate(`/chat?id=${chat.id}`, { state: { chat } })

        if (!user.current) return

        const data: ChatJoinForm = { chat_id: chat.id, user_id: user.current.id }
        io.emit("chat:join", data)
    }

    const addMessage = (message: Message) => {
        const newChat = chat
        newChat.messages.push(message)
        setChat(newChat)
    }

    const checkUser = () => {
        if (!user.current) navigate("/")
    }

    const onLeaveChat = async () => {
        if (!user.current) return
        navigate("/")
        const data: ChatJoinForm = { chat_id: chat.id, user_id: user.current?.id }
        const response = await api.delete("/chats/user", { params: data })
        return response.data
    }

    useEffect(() => {
        io.on("chat:message", (message: Message) => {
            addMessage(message)
        })
    }, [chat])

    useEffect(() => {
        setChat(initialChat)
    }, [initialChat])

    return { join, chat, checkUser, onLeaveChat }
}
