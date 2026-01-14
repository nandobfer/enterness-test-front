import React, { useMemo } from "react"
import { Box, Button, IconButton, Paper, TextField, Tooltip, Typography } from "@mui/material"
import { Add, Circle, Search } from "@mui/icons-material"
import { useRooms } from "../../hooks/useRooms"
import { useUser } from "../../hooks/useUser"

interface RoomsListProps {
    rooms: ReturnType<typeof useRooms>
}

export const RoomsList: React.FC<RoomsListProps> = (props) => {
    const user = useUser()
    const socketConnected = useMemo(() => user.socket?.connected, [user.socket?.connected])

    return (
        <Paper sx={{ flexDirection: "column", flex: 0.25, padding: 3, gap: 2 }}>
            <Box sx={{ justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ alignItems: "center", gap: 1 }}>
                    <Typography variant="h6" fontWeight={"bold"}>
                        Enterness Test
                    </Typography>
                    <Tooltip title={`${socketConnected ? "Conectado" : "Desconectado"}`}>
                        <IconButton size="small">
                            <Circle fontSize="small" color={socketConnected ? "success" : "disabled"} />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Button size="small" startIcon={<Add />} variant="contained" onClick={() => props.rooms.setRoomFormModal(true)}>
                    nova sala
                </Button>
            </Box>
            <TextField size="small" placeholder="digite para buscar" slotProps={{ input: { startAdornment: <Search />, sx: { gap: 1 } } }} />
            <Button onClick={() => props.rooms.refetch()}>atualizar</Button>
        </Paper>
    )
}
