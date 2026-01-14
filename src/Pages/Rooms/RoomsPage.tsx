import React from "react"
import { Box, Divider, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import { RoomsList } from "./RoomsList"
import { useRooms } from "../../hooks/useRooms"
import { WhatsappWebSvg } from "../../components/WhatsappWebSvg"
import { RoomFormModal } from "./RoomFormModal"

interface RoomsPageProps {}

export const RoomsPage: React.FC<RoomsPageProps> = (props) => {
    const { id } = useParams()
    const rooms = useRooms()

    return (
        <Box sx={{ flex: 1, margin: -5 }}>
            <RoomsList rooms={rooms} />
            <Divider orientation="vertical" />
            {id ? null : (
                <Box sx={{ flex: 0.75, padding: 3, flexDirection: "column", alignItems: "center", gap: 4, justifyContent: "space-between" }}>
                    <Typography variant="h6" color="secondary">
                        Selecione uma sala para começar a interagir
                    </Typography>
                    <WhatsappWebSvg />
                    <Typography variant="subtitle2" color="secondary">
                        Você pode se conectar a múltiplas salas ao mesmo tempo.
                    </Typography>
                </Box>
            )}

            <RoomFormModal rooms={rooms} />
        </Box>
    )
}
