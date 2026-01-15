import { useQuery } from "@tanstack/react-query"
import { api } from "../backend"
import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { roomFormSchema } from "../schemas/roomFormSchema"
import { sleep } from "../tools/sleep"
import { JoinRoomDto, RoomDto, RoomFormDto } from "../types/rooms/rooms.entity"
import { useUser } from "./useUser"
import Fuse from "fuse.js"
import { debounce } from "@mui/material"
import { EventBus } from "../tools/EventBus"
import { MessageDto } from "../types/messages/messages.entity"
import { useNavigate } from "react-router-dom"

export const useRooms = (currentRoomId?: string) => {
    const navigate = useNavigate()
    const user = useUser()
    const { isFetching, refetch } = useQuery<RoomDto[]>({
        queryKey: ["rooms"],
        queryFn: () =>
            api.get<RoomDto[]>("/rooms").then((res) => {
                setRoomsList(res.data)
                return res.data
            }),
        initialData: [],
    })

    const roomForm = useForm<RoomFormDto>({ resolver: zodResolver(roomFormSchema), values: { user_id: user.dto?.id || "", name: "" } })
    const submitNewRoom = roomForm.handleSubmit(async (data) => {
        try {
            user.socket?.emit("room:new", data, async (ack: { error?: string; room?: RoomDto }) => {
                if (ack.error) {
                    throw new Error(ack.error)
                }

                if (ack.room) {
                    upsertRoom(ack.room)
                    closeRoomFormModal()
                    navigate(`/rooms/${ack.room.id}`)
                }
            })
        } catch (error) {
            console.log(error)
        } finally {
            await sleep(1000)
        }
    })

    const leaveRoomForm = useForm<JoinRoomDto>()
    const submitLeaveRoom = leaveRoomForm.handleSubmit(async (data) => {
        if (!user.dto) return

        data.user_id = user.dto.id
        try {
            user.socket?.emit("room:leave", data, async (ack: { error?: string; room?: RoomDto }) => {
                if (ack.error) {
                    throw new Error(ack.error)
                }

                if (ack.room) {
                    upsertRoom(ack.room)
                    navigate("/rooms")
                }
            })
        } catch (error) {
            console.log(error)
        } finally {
            await sleep(1000)
        }
    })

    const upsertRoom = (room: RoomDto) => {
        setRoomsList((rooms) => [...rooms.filter((r) => r.id !== room.id), room])
    }

    const closeRoomFormModal = () => {
        setRoomFormModal(false)
        roomForm.reset()
    }

    const [roomFormModal, setRoomFormModal] = useState(false)
    const [joiningRoom, setJoiningRoom] = useState<RoomDto | null>(null)
    const [roomsList, setRoomsList] = useState<RoomDto[]>([])
    const [searchText, setSearchText] = useState("")
    const [filter, setFilter] = useState<"all" | "mine">("all")

    const currentRoom = useMemo(() => roomsList.find((room) => room.id === currentRoomId), [roomsList, currentRoomId])

    const onSearchTextChange = debounce((text: string) => {
        setSearchText(text)
    }, 300)

    const filteredRoomsList = useMemo(() => {
        const baseList = filter === "mine" ? roomsList.filter((room) => room.users.some((u) => u.id === user.dto?.id)) : roomsList
        if (searchText.trim() === "") return baseList

        const keys: (keyof RoomDto)[] = ["name"]
        const fuse = new Fuse(baseList, { keys, threshold: 0.3 })

        const results = fuse.search(searchText)
        return results.map((result) => result.item)
    }, [roomsList, searchText, filter])

    const onNewMessage = (message: MessageDto) => {
        const room = roomsList.find((r) => r.id === message.roomId)
        if (room) {
            room.lastMessage = message
            upsertRoom(room)
        }
    }

    const onNewRoom = (room: RoomDto) => {
        upsertRoom(room)
    }

    useEffect(() => {
        EventBus.on("room:upsert", upsertRoom)
        user.socket?.on("rooms:new", onNewRoom)
        return () => {
            EventBus.off("room:upsert", upsertRoom)
            user.socket?.off("rooms:new", onNewRoom)
        }
    }, [])

    useEffect(() => {
        user.socket?.on(`room:message`, onNewMessage)

        return () => {
            user.socket?.off(`room:message`, onNewMessage)
        }
    }, [roomsList])

    return {
        isFetching,
        roomsList: filteredRoomsList,
        refetch,
        roomFormModal,
        setRoomFormModal,
        roomForm,
        submitNewRoom,
        closeRoomFormModal,
        searchText,
        onSearchTextChange,
        filter,
        setFilter,
        currentRoom,
        joiningRoom,
        setJoiningRoom,
        leaveRoomForm,
        submitLeaveRoom,
    }
}
