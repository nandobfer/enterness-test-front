import { useQuery } from "@tanstack/react-query"
import { RoomDto } from "../types/rooms/rooms.entity"
import { api } from "../backend"
import { useEffect, useState } from "react"
import { useUser } from "./useUser"

export const useRoomOnlineCount = (room: RoomDto) => {
    const user = useUser()
    const { isFetching } = useQuery<number>({
        queryKey: [room.id, "online-count"],
        queryFn: () =>
            api.get<number>(`/rooms/${room.id}/online-count`).then((res) => {
                setValue(res.data)
                return res.data
            }),
        initialData: 0,
    })

    const [value, setValue] = useState(0)

    useEffect(() => {
        user.socket?.on(`room:${room.id}:online`, (count: number) => {
            setValue(count)
        })

        return () => {
            user.socket?.off(`room:${room.id}:online`)
        }
    }, [])

    return { value, isFetching }
}
