import React, { useMemo } from "react"
import { Avatar, Box, Button, Chip, IconButton, Paper, TextField, Tooltip, Typography } from "@mui/material"
import { Add, Circle, Search } from "@mui/icons-material"
import { useRooms } from "../../hooks/useRooms"
import { useUser } from "../../hooks/useUser"
import { RoomItem } from "./RoomItem/RoomItem"
import { Virtuoso } from "react-virtuoso"
import { RoomItemSkeleton } from "./RoomItem/RoomItemSkeleton"

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
            <TextField
                size="small"
                onChange={(e) => props.rooms.onSearchTextChange(e.target.value)}
                placeholder="digite para buscar"
                slotProps={{ input: { startAdornment: <Search />, sx: { gap: 1 } } }}
            />

            <Box sx={{ gap: 2 }}>
                <Chip
                    label="todas"
                    color={props.rooms.filter === "all" ? "primary" : "default"}
                    onClick={() => props.rooms.setFilter("all")}
                    variant={props.rooms.filter === "all" ? "filled" : "outlined"}
                />
                <Chip
                    label="minhas salas"
                    color={props.rooms.filter === "mine" ? "primary" : "default"}
                    onClick={() => props.rooms.setFilter("mine")}
                    variant={props.rooms.filter === "mine" ? "filled" : "outlined"}
                />
            </Box>

            {props.rooms.isFetching && props.rooms.roomsList.length === 0 ? (
                <Box sx={{ flexDirection: "column", overflow: "auto" }}>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <RoomItemSkeleton key={index} />
                    ))}
                </Box>
            ) : (
                <Virtuoso
                    data={props.rooms.roomsList.sort((a, b) => {
                        const dateA = a.lastMessage ? new Date(a.lastMessage.createdAt) : new Date(a.createdAt)
                        const dateB = b.lastMessage ? new Date(b.lastMessage.createdAt) : new Date(b.createdAt)
                        return dateB.getTime() - dateA.getTime()
                    })}
                    itemContent={(_, room) => <RoomItem room={room} rooms={props.rooms} />}
                />
            )}

            <Paper sx={{ margin: -3, padding: 2, marginTop: "auto", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ bgcolor: "primary.main", fontWeight: "bold" }}>{user.dto?.username.charAt(0).toUpperCase()}</Avatar>
                <Typography variant="subtitle2" color="textSecondary">
                    {user.dto?.email}
                </Typography>

                <Button variant="outlined" size="small" onClick={() => user.logout()} sx={{ marginLeft: "auto" }}>
                    sair
                </Button>
            </Paper>
        </Paper>
    )
}
