import React from "react"
import { Box, Divider } from "@mui/material"
import { useParams } from "react-router-dom"
import { RoomsList } from "./RoomsList"
import { useRooms } from "../../hooks/useRooms"
import { RoomFormModal } from "./RoomFormModal"
import { RoomComponent } from "./RoomComponent/RoomComponent"
import { JoinRoomModal } from "./RoomItem/JoinRoomModal"
import { NoRoomSelected } from "./NoRoomSelected"

interface RoomsPageProps {}

export const RoomsPage: React.FC<RoomsPageProps> = (_) => {
    const { id } = useParams()
    const rooms = useRooms(id)

    return (
        <Box sx={{ flex: 1, margin: -5 }}>
            <RoomsList rooms={rooms} />
            <Divider orientation="vertical" />

            <Box sx={{ flex: 0.75 }}>
                {rooms.currentRoom ? <RoomComponent room={rooms.currentRoom} rooms={rooms} /> : <NoRoomSelected rooms={rooms} />}
            </Box>

            <RoomFormModal rooms={rooms} />
            <JoinRoomModal rooms={rooms} />
        </Box>
    )
}
