import React, { useCallback, useEffect, useState } from 'react'
import {Box, Button, CircularProgress, debounce, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material'
import { useUser } from '../../hooks/useUser'
import { CheckCircle, Error } from '@mui/icons-material'

interface LoginModalProps {
}

export const LoginModal: React.FC<LoginModalProps> = ({  }) => {
    const {user} = useUser()
    
    const [checking, setChecking] = useState(false)
    const [username, setUsername] = useState("")
    const [error, setError] = useState("")
    const [valid, setValid] = useState(false)
    const [submiting, setSubmiting] = useState(false)

    const checkUsername = async (username: string) => {
        setChecking(true)

        try {
            const valid = await user.checkUsername(username)
            console.log(valid)
            setValid(valid)
            if (!valid) {
                setError('Já existe um usuário logado com este nome')
            }   
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => setChecking(false), 500)
        }
    }

    const debouncedCheckUsername = useCallback(debounce(checkUsername, 500), [])

    const submitUsername = async () => {
        if (submiting || !valid || error) return
        setSubmiting(true)

        try {
            const newUser = await user.login(username)
            user.set(newUser)
        } catch (error) {
            console.log(error)
        } finally {
            setSubmiting(false)
        }
    }

    useEffect(() => {
        setValid(false)
        setError("")
        if (username) {
            debouncedCheckUsername(username)
        } else {
            setError("")
        }
    }, [username])
    
    return (
        <Dialog
            open={!user.current}
            PaperProps={{ sx: { bgcolor: "background.default" } }}
            slotProps={{ backdrop: { sx: { backdropFilter: "blur(5px)", background: "transparent" } } }}
        >
            <DialogTitle>Escolha um nome de usuário</DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "1vw" }}>
                <DialogContentText>Por favor, digite um nome de usuário para se conectar.</DialogContentText>
                <TextField
                    label="nome de usuário"
                    onChange={(ev) => setUsername(ev.target.value)}
                    slotProps={{
                        input: {
                            endAdornment: checking ? (
                                <CircularProgress size="1.5rem" />
                            ) : error ? (
                                <Error color="error" />
                            ) : valid ? (
                                <CheckCircle color="success" />
                            ) : undefined,
                        },
                    }}
                    error={!!error}
                    helperText={error}
                />
                <Button sx={{ alignSelf: "flex-end" }} variant="contained" onClick={submitUsername} disabled={!!error || !username || !valid}>
                    {submiting ? <CircularProgress size="1.5rem" color="inherit" /> : "confirmar"}
                </Button>
            </DialogContent>
        </Dialog>
    )
}