import React from "react"
import { Avatar, Box, Paper, Typography } from "@mui/material"
import { Forum } from "@mui/icons-material"
import { UserChats } from "./UserChats"
import { useUser } from "../../../hooks/useUser"

interface UserFrameProps {}

export const UserFrame: React.FC<UserFrameProps> = ({}) => {
    const { user } = useUser()

    return (
        <Paper sx={{ flex: 1 / 6, borderBottomLeftRadius: "2vw", flexDirection: "column", padding: "2vw", gap: "2vw" }}>
            <Box sx={{ flexDirection: "column", alignItems: "center", gap: "1vw" }}>
                <Avatar sx={{ color: "primary.main", bgcolor: "secondary.main", width: "5vw", height: "auto", aspectRatio: "1/1" }} />
                <Typography sx={{ fontWeight: "bold" }}>{user.current?.username}</Typography>
            </Box>

            <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                <Box sx={{ alignItems: "center", gap: "0.5vw", alignSelf: "center" }}>
                    <Forum color="secondary" />
                    <Typography sx={{ fontWeight: "bold", color: "secondary.main" }}>Suas salas</Typography>
                </Box>

                <UserChats />
            </Box>
        </Paper>
    )
}
