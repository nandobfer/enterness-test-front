import React, { useState } from "react"
import { Avatar, Box, IconButton, Menu, MenuItem, Paper, TextField, Typography } from "@mui/material"
import { RoomDto } from "../../../types/rooms/rooms.entity"
import { Close, Send, Menu as MenuIcon } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { MessagesList } from "./MessagesList"
import { useMessages } from "../../../hooks/useMessages"
import { useRooms } from "../../../hooks/useRooms"

interface RoomComponentProps {
    room: RoomDto
    rooms: ReturnType<typeof useRooms>
}

export const RoomComponent: React.FC<RoomComponentProps> = (props) => {
    const navigate = useNavigate()
    const messages = useMessages(props.room)

    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            messages.submitMessage()
        }
    }

    const onLeaveRoomClick = () => {
        setMenuAnchor(null)
        props.rooms.leaveRoomForm.setValue("room_id", props.room.id)
        props.rooms.submitLeaveRoom()
    }

    return (
        <Box sx={{ flexDirection: "column", flex: 1, position: "relative" }}>
            <Paper sx={{ padding: 2, alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ alignItems: "center", gap: 2 }}>
                    <Avatar sx={{ bgcolor: "primary.main", fontWeight: "bold" }}>{props.room.name.charAt(0).toUpperCase()}</Avatar>
                    <Typography variant="subtitle1">{props.room.name}</Typography>
                </Box>

                <Box sx={{ gap: 2, alignItems: "center" }}>
                    <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)} size="small">
                        <MenuIcon />
                    </IconButton>
                    <IconButton onClick={() => navigate("/rooms")} size="small">
                        <Close />
                    </IconButton>
                </Box>
            </Paper>

            <MessagesList messages={messages.messagesList} />

            <Box component={"form"} sx={{ padding: 3, paddingTop: 0 }} onSubmit={messages.submitMessage}>
                <Paper sx={{ width: 1 }} elevation={1}>
                    <TextField
                        fullWidth
                        placeholder="Digite sua mensagem..."
                        autoComplete="off"
                        onKeyDown={handleKeyDown}
                        multiline
                        size="small"
                        {...messages.register("content")}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <IconButton type="submit" size="small">
                                        <Send fontSize="small" />
                                    </IconButton>
                                ),
                            },
                        }}
                    />
                </Paper>
            </Box>

            <Menu
                anchorEl={menuAnchor}
                open={!!menuAnchor}
                onClose={() => setMenuAnchor(null)}
                slotProps={{ paper: { sx: { bgcolor: "background.default" } } }}
            >
                <MenuItem onClick={onLeaveRoomClick}>sair da sala</MenuItem>
            </Menu>
        </Box>
    )
}
