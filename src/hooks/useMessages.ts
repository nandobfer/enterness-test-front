import { useForm } from "react-hook-form"
import { RoomDto } from "../types/rooms/rooms.entity"
import { MessageDto, MessageForm } from "../types/messages/messages.entity"
import { useUser } from "./useUser"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { api } from "../backend"
import { EventBus } from "../tools/EventBus"

export const useMessages = (room: RoomDto) => {
    const user = useUser()
    const { handleSubmit, formState, reset, register } = useForm<MessageForm>()

    const {} = useQuery<MessageDto[]>({
        queryKey: [room.id, "messages"],
        queryFn: () =>
            api.get<MessageDto[]>(`/rooms/${room.id}/messages`).then((res) => {
                setMessagesList(res.data)
                return res.data
            }),
        initialData: [],
    })

    const [messagesList, setMessagesList] = useState<(MessageDto & { placeholder?: boolean })[]>([])

    const upsertMessage = (message: MessageDto & { placeholder?: boolean }) => {
        setMessagesList((messages) => [...messages.filter((m) => m.id !== message.id), message])
    }

    const submitMessage = handleSubmit(async (data) => {
        if (!user.dto || !data.content.trim()) return
        console.log(`Sending message to room ${room.id}:`, data)
        data.roomId = room.id
        data.authorId = user.dto.id
        data.content = data.content.trim()

        const placeholderMessage: MessageDto & { placeholder: true } = {
            id: `placeholder-${Date.now()}`,
            content: data.content,
            roomId: room.id,
            createdAt: new Date(),
            placeholder: true,
            author: user.dto,
        }
        upsertMessage(placeholderMessage)

        user.socket?.emit("room:message", data, (ack: { error?: string; message?: MessageDto }) => {
            if (ack.error) {
                console.error("Error sending message:", ack.error)
            }

            if (ack.message) {
                upsertMessage(ack.message)
                room.lastMessage = ack.message
                EventBus.emit("room:upsert", room)
            }

            setMessagesList((messages) => messages.filter((m) => m.id !== placeholderMessage.id))
        })
        reset()
    })

    const onNewMessage = (message: MessageDto) => {
        if (message.roomId !== room.id) return
        upsertMessage(message)
    }

    useEffect(() => {
        user.socket?.on(`room:message`, onNewMessage)

        return () => {
            user.socket?.off(`room:message`, onNewMessage)
        }
    }, [])

    return { messagesList, submitMessage, formState, register }
}
