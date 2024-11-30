import React from "react"
import { Box, IconButton, Paper } from "@mui/material"
import { Chat } from "../../types/class/Chat"
import { Title } from "../../components/Title"
import { Lock, Send } from "@mui/icons-material"

interface ChatListItemProps {
    chat: Chat
}

export const ChatListItem: React.FC<ChatListItemProps> = ({ chat }) => {
    return (
        <Paper sx={{ padding: "1vw", flexDirection: "column", gap: "1vw" }}>
            <Title
                name={chat.name}
                right={
                    <Box sx={{ alignItems: "center", gap: "0.5vw" }}>
                        {!!chat.password && <Lock color="primary" />}
                        <IconButton>
                            <Send color="primary" />
                        </IconButton>
                    </Box>
                }
            />
            {chat.lastMessage
                ? `${chat.users.find((user) => user.id === chat.lastMessage?.author_id)}: ${chat.lastMessage.body}`
                : "Nenhuma mensagem"}
        </Paper>
    )
}
