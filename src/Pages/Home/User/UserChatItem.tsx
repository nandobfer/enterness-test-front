import React from "react"
import { Box, MenuItem } from "@mui/material"
import { Chat } from "../../../types/class/Chat"
import { useChat } from "../../../hooks/useChat"

interface ChatItemProps {
    chat: Chat
    active?: boolean
}

export const ChatItem: React.FC<ChatItemProps> = ({ chat, active }) => {
    const { join } = useChat(chat)

    return (
        <MenuItem sx={active ? { bgcolor: "primary.main", pointerEvents: "none" } : undefined} onClick={() => join(chat)}>
            {chat.name}
        </MenuItem>
    )
}
