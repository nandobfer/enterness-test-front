import React from 'react'
import {Box, Paper, ThemeProvider} from '@mui/material'
import { SnackbarProvider } from 'burgos-snackbar'
import { IoProvider } from './contexts/ioContext'
import { BrowserRouter } from 'react-router-dom'
import { useMuiTheme } from './hooks/useMuiTheme'
import { UserProvider } from './contexts/userContext'

interface ProvidersProps {
    children: React.ReactNode
}

export const Providers:React.FC<ProvidersProps> = ({ children }) => {
    const mui_theme = useMuiTheme()

    return (
        <ThemeProvider theme={mui_theme}>
            <SnackbarProvider>
                <IoProvider>
                    <UserProvider>
                        <BrowserRouter>
                            <Box sx={{ flex: 1, bgcolor: "background.default", padding: "3vw" }}>
                                <Paper sx={{ flex: 1, borderTopRightRadius: "2vw", borderBottomLeftRadius: "2vw" }}>{children}</Paper>
                            </Box>
                        </BrowserRouter>
                    </UserProvider>
                </IoProvider>
            </SnackbarProvider>
        </ThemeProvider>
    )
}