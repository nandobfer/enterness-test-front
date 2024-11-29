import React, { useState } from "react"
import { Box, Grid2 } from "@mui/material"
import { ChatFormContainer } from "./ChatFormContainer"
import { Chat } from "../../types/class/Chat"
import { ChatListItem } from "./ChatListItem"

interface ChatListProps {}

export const ChatList: React.FC<ChatListProps> = ({}) => {
    const [chats, setChats] = useState<Chat[]>([])

    const addChat = (chat: Chat) => setChats((chats) => [...chats.filter((item) => item.id !== chat.id), chat])

    return (
        <Box sx={{ flex: 1 }}>
            <ChatFormContainer onSuccess={addChat} />

            <Grid2 container columns={3} sx={{ flex: 3 / 4 }}>
                {chats.map((chat) => (
                    <Grid2 key={chat.id}>
                        <ChatListItem chat={chat} />
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    )
}
