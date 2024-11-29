import React from "react"
import { Box } from "@mui/material"
import { Chat } from "../../types/class/Chat"

interface ChatListItemProps {
    chat: Chat
}

export const ChatListItem: React.FC<ChatListItemProps> = ({ chat }) => {
    return <Box sx={{}}>{chat.name}</Box>
}
