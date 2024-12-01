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
            <ChatList />
            <LoginModal />
        </Box>
    )
}