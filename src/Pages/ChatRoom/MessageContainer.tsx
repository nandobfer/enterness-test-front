import React from "react"
import { Box } from "@mui/material"
import { Message } from "../../types/class/Message"

interface MessageContainerProps {
    message: Message
}

export const MessageContainer: React.FC<MessageContainerProps> = ({ message }) => {
    return <Box sx={{}}></Box>
}
