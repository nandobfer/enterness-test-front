import React, { useEffect, useState } from "react"
import { Box, LinearProgress } from "@mui/material"
import { ChatFormContainer } from "./ChatFormContainer"
import { Chat } from "../../types/class/Chat"
import { ChatListItem } from "./ChatListItem"
import { api } from "../../backend"
import { useUser } from "../../hooks/useUser"
import { useIo } from "../../hooks/useIo"

interface ChatListProps {}

export const ChatList: React.FC<ChatListProps> = ({}) => {
    const { user } = useUser()
    const io = useIo()

    const [chats, setChats] = useState<Chat[]>([])
    const [loading, setLoading] = useState(true)

    const addChat = (chat: Chat) => setChats((chats) => [...chats.filter((item) => item.id !== chat.id), chat])
    const removeChat = (chat_id: string) => setChats((chats) => chats.filter((item) => item.id !== chat_id))

    const fetchChats = async () => {
        setLoading(true)

        try {
            const response = await api.get("/chats")
            setChats(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchChats()

        if (user.current) {
            io.on("chats:new", (chat: Chat) => addChat(chat))
            io.on("chats:delete", (chat_id: string) => removeChat(chat_id))

            return () => {
                io.off("chats:new")
                io.off("chats:delete")
            }
        }
    }, [user.current])

    return (
        <Box sx={{ flex: 1, gap: "2vw" }}>
            <ChatFormContainer onSuccess={addChat} />

            <Box sx={{ flex: 2 / 3, flexDirection: "column", gap: "1vw", overflowY: "auto", maxHeight: "87vh", margin: "-2vw 0", padding: "2vw 0" }}>
                {loading ? (
                    <LinearProgress variant="indeterminate" sx={{}} />
                ) : (
                    chats.sort((a, b) => Number(a.createdAt) - Number(b.createdAt)).map((chat) => <ChatListItem key={chat.id} chat={chat} />)
                )}
            </Box>
        </Box>
    )
}
