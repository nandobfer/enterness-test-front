import React, { useEffect, useState } from "react"
import { Box, IconButton } from "@mui/material"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { Chat } from "../../types/class/Chat"
import { api } from "../../backend"
import { ArrowBackIos } from "@mui/icons-material"
import { useIo } from "../../hooks/useIo"
import { useChat } from "../../hooks/useChat"

interface ChatRoomProps {}

export const ChatRoom: React.FC<ChatRoomProps> = ({}) => {
    const location = useLocation()
    const navigate = useNavigate()
    const io = useIo()
    const { chat } = useChat(location.state.chat)

    const [loading, setLoading] = useState(true)

    useEffect(() => {}, [])

    return (
        <Box sx={{}}>
            <IconButton onClick={() => navigate("/")}>
                <ArrowBackIos />
            </IconButton>
            {chat.data.name}
        </Box>
    )
}
