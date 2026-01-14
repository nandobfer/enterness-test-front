import React from "react"
import { Box, Divider } from "@mui/material"
import { useParams } from "react-router-dom"
import { RoomsList } from "./RoomsList"
import { useRooms } from "../../hooks/useRooms"

interface RoomsPageProps {}

export const RoomsPage: React.FC<RoomsPageProps> = (props) => {
    const { id } = useParams()
    const rooms = useRooms()

    return <Box sx={{ flex: 1, margin: -5 }}>
        <RoomsList rooms={rooms} />
        <Divider orientation="vertical" />
    </Box>
}
