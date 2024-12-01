import React from "react"
import { Box, Paper } from "@mui/material"
import { Message } from "../../types/class/Message"
import { MessageContainer } from "./MessageContainer"

interface MessagesContainerProps {
    messages: Message[]
}

export const MessagesContainer: React.FC<MessagesContainerProps> = ({ messages }) => {
    return (
        <Paper sx={{ flex: 1, borderTopRightRadius: "2vw", borderBottomLeftRadius: "2vw", flexDirection: "column", justifyContent: "flex-end" }}>
            {messages.map((item) => (
                <MessageContainer message={item} key={item.id} />
            ))}
        </Paper>
    )
}
