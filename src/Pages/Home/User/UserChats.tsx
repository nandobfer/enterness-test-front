import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import { useUser } from "../../../hooks/useUser"
import { Chat } from "../../../types/class/Chat"
import { ChatItem } from "./UserChatItem"
import { useIo } from "../../../hooks/useIo"

interface UserChatsProps {}

export const UserChats: React.FC<UserChatsProps> = ({}) => {
    const { user } = useUser()
    const io = useIo()

    const [chats, setChats] = useState<Chat[]>([])

    const addChat = (chat: Chat) => setChats((chats) => [...chats.filter((item) => item.id !== chat.id), chat])


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

            io.on("chats:new", (chat: Chat) => addChat(chat))

            return () => {
                io.off("chats:new")
            }
        }
    }, [user.current])

    return (
        <Box sx={{ flexDirection: "column", margin: "0 -2vw" }}>
            {chats.map((chat) => (
                <ChatItem chat={chat} key={chat.id} />
            ))}
        </Box>
    )
}
