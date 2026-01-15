import React from "react"
import { Box, Button, Typography } from "@mui/material"
import { WhatsappWebSvg } from "../../components/WhatsappWebSvg"
import { useRooms } from "../../hooks/useRooms"

interface NoRoomSelectedProps {
    rooms: ReturnType<typeof useRooms>
}

export const NoRoomSelected: React.FC<NoRoomSelectedProps> = (props) => {
    return (
        <Box sx={{ flex: 1, padding: 3, flexDirection: "column", alignItems: "center", gap: 4, justifyContent: "center", position: "relative" }}>
            <WhatsappWebSvg />
            <Typography variant="h5" color="secondary" fontWeight={"bold"}>
                Selecione uma sala para começar a interagir
            </Typography>
            <Typography variant="subtitle1" color="secondary" sx={{ maxWidth: 500, textAlign: "center" }}>
                Você pode criar uma nova sala ou se conectar a uma existente.
            </Typography>
            <Button variant="contained" onClick={() => props.rooms.setRoomFormModal(true)}>
                nova sala
            </Button>

            <Typography variant="subtitle2" color="secondary" sx={{ position: "absolute", bottom: 16 }}>
                Você pode se conectar a múltiplas salas ao mesmo tempo.
            </Typography>
        </Box>
    )
}
