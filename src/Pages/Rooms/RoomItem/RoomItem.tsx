import React from "react"
import { Avatar, Box, Chip, IconButton, MenuItem, Paper, Tooltip, Typography } from "@mui/material"
import { RoomDto } from "../../../types/rooms/rooms.entity"
import { Group, Lock } from "@mui/icons-material"
import { useRoomOnlineCount } from "../../../hooks/useRoomOnlineCount"
import { useUser } from "../../../hooks/useUser"
import { useNavigate } from "react-router-dom"
import { useRooms } from "../../../hooks/useRooms"
import { formatChatDate } from "../../../tools/chatDateFormat"

interface RoomItemProps {
    room: RoomDto
    rooms: ReturnType<typeof useRooms>
}

export const RoomItem: React.FC<RoomItemProps> = (props) => {
    const user = useUser()
    const lastMessage = props.room.users.some(item => item.id === user.dto?.id) ? props.room.lastMessage : undefined
    const lastMessageContent = lastMessage ? `${lastMessage.author.username}: ${lastMessage.content}` : ""
    
    const onlineCount = useRoomOnlineCount(props.room)
    const navigate = useNavigate()

    const onRoomClick = () => {
        if (props.room.users.find(item => item.id === user.dto?.id)) {
            navigate(`/rooms/${props.room.id}`)
        } else {
            props.rooms.setJoiningRoom(props.room)
        }
    }

    const Datetime = () => lastMessage ? (
            <Typography variant="caption" sx={{ color: "text.secondary", opacity: 0.8, marginRight: 0.5, marginTop: 'auto' }}>
                {formatChatDate(new Date(lastMessage.createdAt))}
            </Typography>
        ) : null

    return (
        <MenuItem sx={{ whiteSpace: "normal", padding: 0, borderRadius: 3 }} onClick={onRoomClick}>
            <Paper sx={{ flex: 1, padding: 2, borderRadius: 3, gap: 2, alignItems: "center", minWidth: 0, overflow: "hidden" }} elevation={props.rooms.currentRoom?.id === props.room.id ? 4 : 0}>
                <Avatar sx={{ bgcolor: "primary.main", fontWeight: "bold" }}>{props.room.name.charAt(0).toUpperCase()}</Avatar>

                <Box sx={{ flexDirection: "column", flex: 1, minWidth: 0 }}>
                    <Box sx={{ alignItems: "center", justifyContent: "space-between" }}>
                        <Typography variant="body1" fontWeight={'bold'} title={props.room.name} noWrap sx={{flex: 0.95}} >{props.room.name}</Typography>
                        <Box sx={{ alignItems: "center", gap: 1 }}>
                            {props.room.isPrivate && (
                                <Tooltip title="essa sala possui senha">
                                    <IconButton size="small">
                                        <Lock fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            )}
                            <Tooltip title={`${onlineCount.value} usuários online`}>
                                <Chip icon={<Group />} label={`${onlineCount.value}`} size="small" color={props.room.users.find(item => item.id === user.dto?.id) ? "primary" : "default"} />
                            </Tooltip>
                        </Box>
                    </Box>

                    <Box sx={{ justifyContent: "space-between", minWidth: 0 }}>
                        <Typography title={lastMessageContent} variant="subtitle2" color="textSecondary" noWrap sx={{ flex: 0.95 }}>
                            {lastMessageContent}
                        </Typography>
                        <Datetime />
                    </Box>
                </Box>
            </Paper>
        </MenuItem>
    )
}
