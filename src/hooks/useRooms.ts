import { useQuery } from "@tanstack/react-query"
import { api } from "../backend"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { roomFormSchema } from "../schemas/roomFormSchema"
import { sleep } from "../tools/sleep"
import { RoomDto, RoomFormDto } from "../types/rooms/rooms.entity"

export const useRooms = () => {
    const { isFetching, refetch } = useQuery<RoomDto[]>({
        queryKey: ["rooms"],
        queryFn: () =>
            api.get<RoomDto[]>("/rooms").then((res) => {
                setRoomsList(res.data)
                return res.data
            }),
        initialData: [],
    })

    const roomForm = useForm<RoomFormDto>({ resolver: zodResolver(roomFormSchema) })
    const submitNewRoom = roomForm.handleSubmit(async (data) => {
        try {
            const response = await api.post<RoomDto>("/rooms", data)
            upsertRoom(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            await sleep(1000)
        }
    })

    const upsertRoom = (room: RoomDto) => {
        setRoomsList((rooms) => [...rooms.filter((r) => r.id !== room.id), room])
    }

    const [roomFormModal, setRoomFormModal] = useState(false)
    const [roomsList, setRoomsList] = useState<RoomDto[]>([])

    return { isFetching, roomsList, refetch, roomFormModal, setRoomFormModal, roomForm, submitNewRoom }
}
