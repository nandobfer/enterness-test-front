import React, { useState } from "react"
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import { Chat } from "../../types/class/Chat"
import { ArrowCircleLeft, Menu as MenuIcon } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

interface ChatHeaderProps {
    chat: Chat
    onLeave: () => void
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

            <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}>
                <MenuItem onClick={onLeave}>Sair da sala</MenuItem>
            </Menu>
        </Box>
    )
}
