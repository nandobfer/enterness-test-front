import React from "react"
import { Box, MenuItem } from "@mui/material"
import { Chat } from "../../../types/class/Chat"
import { useChat } from "../../../hooks/useChat"

interface ChatItemProps {
    chat: Chat
}

export const ChatItem: React.FC<ChatItemProps> = ({ chat }) => {
    const { join } = useChat()

    return <MenuItem onClick={() => join(chat)}>{chat.name}</MenuItem>
}
