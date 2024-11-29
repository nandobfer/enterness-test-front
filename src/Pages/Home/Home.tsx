import React from 'react'
import {Box, Paper} from '@mui/material'
import { LoginModal } from './LoginModal'

interface HomeProps {
    
}

export const Home:React.FC<HomeProps> = ({  }) => {
    
    return (
        <Box sx={{flex: 1}}>
            <Paper sx={{ flex: 1 / 5, borderBottomLeftRadius: '2vw', flexDirection: 'column', padding: '2vw' }}>
            </Paper>
            <LoginModal />
        </Box>
    )
}