import React from "react"
import { Box, MenuItem } from "@mui/material"
import { Chat } from "../../types/class/Chat"

interface ChatItemProps {
    chat: Chat
    onClick: () => void
}

export const ChatItem: React.FC<ChatItemProps> = ({ chat, onClick }) => {
    return <MenuItem onClick={onClick}>{chat.name}</MenuItem>
}
