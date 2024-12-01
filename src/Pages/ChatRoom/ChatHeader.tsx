import React, { useState } from "react"
import { Box, IconButton, Menu, MenuItem, SvgIconTypeMap, Typography } from "@mui/material"
import { Chat } from "../../types/class/Chat"
import { ArrowCircleLeft, Menu as MenuIcon, Message, Person } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { OverridableComponent } from "@mui/material/OverridableComponent"

interface ChatHeaderProps {
    chat: Chat
    onLeave: () => void
}

export const ChatDetail: React.FC<{
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string
    }
    value: number
}> = ({ icon, value }) => {
    const Icon = icon
    return (
        <Box sx={{ alignItems: "center", gap: "0.5vw", fontSize: "0.9rem" }}>
            <Icon sx={{ width: "1vw" }} />
            {value}
        </Box>
    )
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ chat, onLeave }) => {
    const navigate = useNavigate()

    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)

    return (
        <Box sx={{ alignItems: "center", gap: "1vw" }}>
            <IconButton onClick={() => navigate("/")} color="primary">
                <ArrowCircleLeft />
            </IconButton>
            <Typography sx={{ fontWeight: "bold" }}>{chat.name}</Typography>

            <IconButton sx={{ marginLeft: "auto" }} onClick={(ev) => setMenuAnchor(ev.currentTarget)}>
                <MenuIcon />
            </IconButton>

            <Menu
                anchorEl={menuAnchor}
                open={!!menuAnchor}
                onClose={() => setMenuAnchor(null)}
                slotProps={{ paper: { sx: { bgcolor: "background.default" } } }}
            >
                <Box sx={{ flexDirection: "column", gap: "0.5vw", padding: "0.5vw" }}>
                    <ChatDetail icon={Person} value={chat.users.length + 1} />
                    <ChatDetail icon={Message} value={chat.messages.length} />
                </Box>
                <MenuItem onClick={onLeave}>Sair da sala</MenuItem>
            </Menu>
        </Box>
    )
}
