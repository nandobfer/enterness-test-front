import React from 'react'
import { Box } from "@mui/material"
import { ChatList } from "./ChatList"

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
    return (
        <Box sx={{ flex: 1 }}>
            <ChatList />
        </Box>
    )
}