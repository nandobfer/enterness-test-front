import React from 'react'
import { Box } from "@mui/material"
import { LoginModal } from "./LoginModal"
import { Route, Routes } from "react-router-dom"
import { ChatList } from "./ChatList"
import { UserFrame } from "./User/UserFrame"

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
    return (
        <Box sx={{ flex: 1 }}>
            <UserFrame />

            <Box sx={{ padding: "2vw", flex: 5 / 6 }}>
                <Routes>
                    <Route index element={<ChatList />} />
                </Routes>
            </Box>

            <LoginModal />
        </Box>
    )
}