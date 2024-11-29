import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import { useUser } from "../../../hooks/useUser"
import { Chat } from "../../../types/class/Chat"
import { ChatItem } from "../ChatItem"

interface UserChatsProps {}

export const UserChats: React.FC<UserChatsProps> = ({}) => {
    const { user } = useUser()

    const [chats, setChats] = useState<Chat[]>([])

    const onChatClick = (chat: Chat) => {}

    const fetchChats = async () => {
        try {
            const chats = await user.getChats()
            setChats(chats)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (user.current) {
            fetchChats()
        }
    }, [user.current])

    return (
        <Box sx={{ flexDirection: "column", margin: "0 -2vw" }}>
            {chats.map((chat) => (
                <ChatItem chat={chat} key={chat.id} onClick={() => onChatClick(chat)} />
            ))}
        </Box>
    )
}
