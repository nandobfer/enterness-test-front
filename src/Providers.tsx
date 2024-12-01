import React from 'react'
import { ThemeProvider } from "@mui/material"
import { SnackbarProvider } from 'burgos-snackbar'
import { IoProvider } from './contexts/ioContext'
import { BrowserRouter } from 'react-router-dom'
import { useMuiTheme } from './hooks/useMuiTheme'
import { UserProvider } from './contexts/userContext'
import { Wrapper } from "./components/Wrapper"

interface ProvidersProps {
    children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    const mui_theme = useMuiTheme()

    return (
        <ThemeProvider theme={mui_theme}>
            <SnackbarProvider>
                <IoProvider>
                    <UserProvider>
                        <BrowserRouter>
                            <Wrapper>{children}</Wrapper>
                        </BrowserRouter>
                    </UserProvider>
                </IoProvider>
            </SnackbarProvider>
        </ThemeProvider>
    )
}