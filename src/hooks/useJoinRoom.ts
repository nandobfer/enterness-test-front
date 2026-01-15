import { useForm } from "react-hook-form"
import { JoinRoomDto, RoomDto } from "../types/rooms/rooms.entity"
import { useUser } from "./useUser"
import { EventBus } from "../tools/EventBus"
import { sleep } from "../tools/sleep"
import { useNavigate } from "react-router-dom"

export const useJoinRoom = (room: RoomDto | null, closeModal: () => void) => {
    const navigate = useNavigate()
    const user = useUser()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<JoinRoomDto>()

    const submitForm = handleSubmit(async (data) => {
        if (!room || !user.dto) return
        return new Promise<void>((resolve) => {
            data.room_id = room.id
            data.user_id = user.dto!.id

            user.socket?.emit("room:join", data, async (ack: { error?: string; room?: RoomDto }) => {
                if (ack.error) {
                    setError("password", { message: ack.error })
                    return resolve()
                }

                if (ack.room) {
                    EventBus.emit("room:upsert", ack.room)
                    await sleep(1000)
                    resolve()
                    closeModal()
                    navigate(`/rooms/${ack.room.id}`)
                }
            })
        })
    })

    return {
        register,
        errors,
        isSubmitting,
        submitForm,
    }
}
