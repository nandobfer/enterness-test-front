import { useNavigate } from "react-router-dom"
import { Chat, ChatJoinForm } from "../types/class/Chat"
import { useEffect, useState } from "react"
import { Message, MessageForm } from "../types/class/Message"
import { useUser } from "./useUser"
import { api } from "../backend"
import { uid } from "uid"

export const useChat = (initialChat: Chat) => {
    const navigate = useNavigate()
    const { user } = useUser()

    const [chat, setChat] = useState(initialChat)
    const [messages, setMessages] = useState<Message[]>(chat.messages)
    const [lastMessage, setLastMessage] = useState<Message | undefined>(chat.lastMessage)

    const join = (chat: Chat) => {
        navigate(`/chat?id=${chat.id}`, { state: { chat } })

        if (!user.current) return

        const data: ChatJoinForm = { chat_id: chat.id, user_id: user.current.id }
        io.emit("chat:join", data)
    }

    const addMessage = (message: Message) => {
        setMessages((messages) => [...messages, message])
        setLastMessage(message)
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

    const sendMessage = async (text: string) => {
        if (!user.current) return

        const data: MessageForm = {
            id: uid(),
            body: text,
            chat_id: chat.id,
            user_id: user.current.id,
            username: user.current.username,
        }

        io.emit("chat:message", data)
    }

    useEffect(() => {
        setMessages(chat.messages)
        io.on("chat:message", (message: Message) => {
            addMessage(message)
        })

        return () => {
            io.off("chat:message")
        }
    }, [chat])

    useEffect(() => {
        setChat(initialChat)
    }, [initialChat])

    return { join, chat, checkUser, onLeaveChat, sendMessage, messages, lastMessage }
}
