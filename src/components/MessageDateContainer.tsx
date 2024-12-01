import React from "react"
import { Box, useMediaQuery } from "@mui/material"
import { Message } from "../types/class/Message"

interface MessageDateContainerProps {
    message: Message
}

export const MessageDateContainer: React.FC<MessageDateContainerProps> = ({ message }) => {
    return (
        <Box
            sx={{
                bottom: "0.5vw",
                right: "0.5vw",
                fontSize: "0.6vw",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "0.2vw",
            }}
        >
            <p>{new Date(Number(message.createdAt)).toLocaleTimeString("pt-br", { hour: "2-digit", minute: "2-digit" })}</p>
        </Box>
    )
}
