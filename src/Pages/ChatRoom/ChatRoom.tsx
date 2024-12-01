import React, { useEffect } from "react"
import { Box } from "@mui/material"
import { useLocation } from "react-router-dom"
import { useChat } from "../../hooks/useChat"
import { ChatHeader } from "./ChatHeader"
import { MessagesContainer } from "./MessagesContainer"
import { MessageInput } from "./MessageInput"

interface ChatRoomProps {}

export const ChatRoom: React.FC<ChatRoomProps> = ({}) => {
    const location = useLocation()
    const { chat, messages, checkUser, onLeaveChat, sendMessage } = useChat(location.state.chat)

    useEffect(() => {
        console.log(chat)
    }, [chat])

    useEffect(() => {
        checkUser()
    }, [])

    return (
        <Box sx={{ flex: 1, flexDirection: "column", margin: "-2vw", padding: "1vw", borderTopRightRadius: "2vw", gap: "1vw" }}>
            <ChatHeader chat={chat} onLeave={onLeaveChat} />
            <MessagesContainer messages={messages} />
            <MessageInput onSubmit={sendMessage} />
        </Box>
    )
}
