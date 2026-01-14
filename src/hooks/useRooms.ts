import { useQuery } from "@tanstack/react-query"
import { RoomDto } from "../types/src/rooms/rooms.entity"
import { api } from "../backend"
import { useState } from "react"

export const useRooms = () => {
    const { isFetching, data, refetch } = useQuery<RoomDto[]>({
        queryKey: ["rooms"],
        queryFn: () => api.get<RoomDto[]>("/rooms").then((res) => res.data),
        initialData: [],
    })

    const [roomFormModal, setRoomFormModal] = useState(false)

    return { isFetching, data, refetch, roomFormModal, setRoomFormModal }
}
