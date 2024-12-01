import React, { useEffect, useState } from "react"
import { Box, Paper, TextField } from "@mui/material"
import { useLocation } from "react-router-dom"
import { useChat } from "../../hooks/useChat"
import { ChatHeader } from "./ChatHeader"

interface ChatRoomProps {}

export const ChatRoom: React.FC<ChatRoomProps> = ({}) => {
    const location = useLocation()
    const { chat, checkUser, onLeaveChat } = useChat(location.state.chat)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        checkUser()
    }, [])

    return (
        <Box sx={{ flex: 1, flexDirection: "column", margin: "-2vw", padding: "1vw", borderTopRightRadius: "2vw", gap: "1vw" }}>
            <ChatHeader chat={chat} onLeave={onLeaveChat} />
            <Paper sx={{ flex: 1, borderTopRightRadius: "2vw", borderBottomLeftRadius: "2vw" }}></Paper>
            <TextField />
        </Box>
    )
}
