import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import { useLocation, useParams } from "react-router-dom"
import { Chat } from "../../types/class/Chat"
import { api } from "../../backend"

interface ChatRoomProps {}

export const ChatRoom: React.FC<ChatRoomProps> = ({}) => {
    const location = useLocation()

    const [chat, setChat] = useState<Chat>(location.state.chat)
    const [loading, setLoading] = useState(true)

    const fetchChat = async () => {
        setLoading(true)
        try {
            const response = await api.get("/chats", { params: { chat_id: chat.id } })
            setChat(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        // fetchChat()
    }, [])

    return <Box sx={{}}>{chat.name}</Box>
}
