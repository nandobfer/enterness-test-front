import React, { useCallback, useEffect, useState } from 'react'
import {Box, Button, CircularProgress, debounce, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material'
import { useUser } from '../../hooks/useUser'
import { CheckCircle, Error } from '@mui/icons-material'
import { useFormik } from "formik"
import { UserForm } from "../../types/class/User"

interface LoginModalProps {}

export const LoginModal: React.FC<LoginModalProps> = ({}) => {
    const { user } = useUser()

    const [checking, setChecking] = useState(false)
    const [error, setError] = useState("")
    const [valid, setValid] = useState(false)
    const [submiting, setSubmiting] = useState(false)

    const formik = useFormik<UserForm>({
        initialValues: { username: "" },
        async onSubmit(values, formikHelpers) {
            if (submiting || !valid || error) return
            setSubmiting(true)

            console.log(values)
            try {
                const newUser = await user.login(values.username)
                user.set(newUser)
            } catch (error) {
                console.log(error)
            } finally {
                setSubmiting(false)
            }
        },
    })

    const checkUsername = async (username: string) => {
        setChecking(true)

        try {
            const valid = await user.checkUsername(username)
            console.log(valid)
            setValid(valid)
            if (!valid) {
                setError("Já existe um usuário logado com este nome")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setChecking(false)
        }
    }

    const debouncedCheckUsername = useCallback(debounce(checkUsername, 500), [])

    useEffect(() => {
        setValid(false)
        setError("")
        if (formik.values.username) {
            debouncedCheckUsername(formik.values.username)
        } else {
            setError("")
        }
    }, [formik.values.username])

    return (
        <Dialog
            open={!user.current}
            PaperProps={{ sx: { bgcolor: "background.default" } }}
            slotProps={{ backdrop: { sx: { backdropFilter: "blur(5px)", background: "transparent" } } }}
        >
            <DialogTitle>Escolha um nome de usuário</DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "1vw" }}>
                <DialogContentText>Por favor, digite um nome de usuário para se conectar.</DialogContentText>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        label="nome de usuário"
                        name="username"
                        onChange={formik.handleChange}
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
                    <Button sx={{ alignSelf: "flex-end" }} variant="contained" type="submit" disabled={!!error || !formik.values.username || !valid}>
                        {submiting ? <CircularProgress size="1.5rem" color="inherit" /> : "confirmar"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}