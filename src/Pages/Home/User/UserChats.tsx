import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import { ChatItem } from "./UserChatItem"
import { useSearchParams } from "react-router-dom"
import { useUser } from "../../../hooks/useUser"
import { RoomDto } from "../../../types/src/rooms/rooms.entity"

interface UserChatsProps {}

export const UserChats: React.FC<UserChatsProps> = ({}) => {
    const [searchParams] = useSearchParams()
    const current_chat_id = searchParams.get("id")
    const { dto } = useUser()

    const [chats, setChats] = useState<RoomDto[]>([])

    const addChat = (chat: RoomDto) => setChats((chats) => [...chats.filter((item) => item.id !== chat.id), chat])
    const removeChat = (chat_id: string) => setChats((chats) => chats.filter((item) => item.id !== chat_id))

    const fetchChats = async () => {
        try {
            // const chats = await dto.getChats()
            setChats(chats)
        } catch (error) {
            console.log(error)
        }
    }

    // useEffect(() => {
    //     if (dto) {
    //         fetchChats()

    //         io.on("chats:join", (chat: RoomDto) => addChat(chat))
    //         io.on("chats:unjoin", (chat_id: string) => removeChat(chat_id))

    //         return () => {
    //             io.off("chats:join")
    //             io.off("chats:unjoin")
    //         }
    //     }
    // }, [user.current])

    return (
        <Box sx={{ flexDirection: "column", margin: "0 -2vw" }}>
            {chats.map((chat) => (
                <ChatItem chat={chat} key={chat.id} active={current_chat_id === chat.id} />
            ))}
        </Box>
    )
}
