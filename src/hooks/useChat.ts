import { useNavigate } from "react-router-dom"
import { Chat, ChatJoinForm } from "../types/class/Chat"
import { useEffect, useState } from "react"
import { Message } from "../types/class/Message"
import { useIo } from "./useIo"
import { useUser } from "./useUser"

export const useChat = (initialChat: Chat) => {
    const navigate = useNavigate()
    const io = useIo()
    const { user } = useUser()

    const [chat, setChat] = useState(initialChat)

    const join = (chat: Chat) => {
        navigate(`/chat?id=${chat.id}`, { state: { chat } })
        helper.onJoin()
    }

    class ChatHelper {
        data = chat

        onJoin() {
            if (!user.current) return

            const data: ChatJoinForm = { chat_id: chat.id, user_id: user.current.id }
            io.emit("chat:join", data)
        }

        onMessage(message: Message) {
            this.data.messages.push(message)
        }
    }

    const helper = new ChatHelper()

    useEffect(() => {
        io.on("chat:message", (message: Message) => {
            helper.onMessage(message)
        })
    }, [chat])

    return { join, chat: helper }
}
