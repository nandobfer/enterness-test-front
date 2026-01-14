import React from "react"
import { Box } from "@mui/material"

interface WrapperProps {
    children: React.ReactNode
}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    return <Box sx={{ flex: 1, bgcolor: "background.default", padding: 5 }}>{children}</Box>
}
