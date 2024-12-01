import React from "react"
import { Box, Button, IconButton, Paper, Typography } from "@mui/material"
import { Chat } from "../../types/class/Chat"
import { Title } from "../../components/Title"
import { AddCircle, Lock, Send } from "@mui/icons-material"
import { useChat } from "../../hooks/useChat"
import { useUser } from "../../hooks/useUser"

interface ChatListItemProps {
    chat: Chat
}

export const ChatListItem: React.FC<ChatListItemProps> = ({ chat: initialChat }) => {
    const { user } = useUser()
    const { join, chat, lastMessage } = useChat(initialChat)

    const is_subscribed = chat.owner.id === user.current?.id || !!chat.users.find((item) => item.id === user.current?.id)

    const lastAuthor =
        lastMessage?.author_id === chat.owner.id ? chat.owner.username : chat.users.find((user) => user.id === lastMessage?.author_id)?.username

    return (
        <Paper sx={{ padding: "1vw", flexDirection: "column", gap: "1vw" }}>
            <Title
                name={chat.name}
                right={
                    <Box sx={{ alignItems: "center", gap: "0.5vw" }}>
                        {!!chat.password && <Lock color="primary" />}
                        <IconButton onClick={() => join(chat)} color="primary">
                            {is_subscribed ? <Send /> : <AddCircle />}
                        </IconButton>
                    </Box>
                }
            />
            {is_subscribed ? (
                lastMessage ? (
                    <Box sx={{ gap: "0.5vw" }}>
                        <Typography sx={{ color: "primary.main" }}>{lastAuthor}:</Typography>
                        <Typography sx={{ width: "35vw", overflow: "hidden", textOverflow: "ellipsis" }}>{lastMessage.body}</Typography>
                    </Box>
                ) : (
                    "Nenhuma mensagem"
                )
            ) : (
                <Button onClick={() => join(chat)}>Participar</Button>
            )}
        </Paper>
    )
}
