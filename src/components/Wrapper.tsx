import React from "react"
import { Box, Paper } from "@mui/material"
import { UserFrame } from "../Pages/Home/User/UserFrame"
import { LoginModal } from "../Pages/Home/LoginModal"

interface WrapperProps {
    children: React.ReactNode
}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    return (
        <Box sx={{ flex: 1, bgcolor: "background.default", padding: "3vw" }}>
            <Paper sx={{ flex: 1, borderTopRightRadius: "2vw", borderBottomLeftRadius: "2vw" }}>
                <UserFrame />
                <Box sx={{ padding: "2vw", flex: 5 / 6 }}>{children}</Box>
            </Paper>
            <LoginModal />
        </Box>
    )
}
