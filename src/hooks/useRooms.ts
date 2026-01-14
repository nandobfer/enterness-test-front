import { useQuery } from "@tanstack/react-query"
import { RoomDto } from "../types/src/rooms/rooms.entity"
import { api } from "../backend"

export const useRooms = () => {
    const { isFetching, data, refetch } = useQuery<RoomDto[]>({
        queryKey: ["rooms"],
        queryFn: () => api.get<RoomDto[]>("/rooms").then((res) => res.data),
        initialData: [],
    })

    return { isFetching, data, refetch }
}
