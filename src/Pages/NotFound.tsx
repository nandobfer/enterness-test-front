import React from "react"
import { Box, Button, Paper, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

interface NotFoundProps {}

export const NotFound: React.FC<NotFoundProps> = (_) => {
    const navigate = useNavigate()
    return (
        <Box sx={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Paper sx={{ padding: 5, flexDirection: "column", alignItems: "center", gap: 2 }}>
                <Typography variant="h3">404</Typography>
                <Typography variant="h5">página não encontrada</Typography>
                <Button fullWidth variant="contained" onClick={() => navigate("/")}>
                    início
                </Button>
            </Paper>
        </Box>
    )
}
