import React from "react"
import { Box, Button, Paper, TextField, Typography } from "@mui/material"
import { Add, Search } from "@mui/icons-material"
import { useRooms } from "../../hooks/useRooms"

interface RoomsListProps {
    rooms: ReturnType<typeof useRooms>
}

export const RoomsList: React.FC<RoomsListProps> = (props) => {
    return (
        <Paper sx={{ flexDirection: "column", flex: 0.25, padding: 3, gap: 2 }}>
            <Box sx={{ justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6" fontWeight={"bold"}>
                    Enterness Test
                </Typography>
                <Button size="small" startIcon={<Add />} variant="contained" onClick={() => props.rooms.setRoomFormModal(true)}>
                    nova sala
                </Button>
            </Box>
            <TextField size="small" placeholder="digite para buscar" slotProps={{ input: { startAdornment: <Search />, sx: { gap: 1 } } }} />
            <Button onClick={() => props.rooms.refetch()}>atualizar</Button>
        </Paper>
    )
}
