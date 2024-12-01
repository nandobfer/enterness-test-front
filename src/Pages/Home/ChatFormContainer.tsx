import React, { useEffect, useState } from "react"
import { Button, CircularProgress, FormControlLabel, IconButton, Paper, Switch, TextField } from "@mui/material"
import { useUser } from "../../hooks/useUser"
import { useFormik } from "formik"
import { Chat, ChatForm } from "../../types/class/Chat"
import { Title } from "../../components/Title"
import { LockOpen, Visibility, VisibilityOff } from "@mui/icons-material"

interface ChatFormContainerProps {
    onSuccess: (chat: Chat) => void
}

export const ChatFormContainer: React.FC<ChatFormContainerProps> = ({ onSuccess }) => {
    const { user } = useUser()

    const [isPrivate, setPrivate] = useState(false)
    const [hiddenPassword, setHiddenPassword] = useState(true)
    const [loading, setLoading] = useState(false)

    const formik = useFormik<ChatForm>({
        initialValues: { name: "", password: "", owner_id: user.current?.id || "" },
        async onSubmit(values) {
            if (loading || !formik.values.name || !formik.values.owner_id || (isPrivate && !formik.values.password)) return
            setLoading(true)

            try {
                const data: ChatForm = { ...values, password: values.password || undefined }
                const chat = await user.createChat(data)
                onSuccess(chat)
                formik.resetForm()
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        },
        enableReinitialize: true,
    })

    useEffect(() => {
        formik.setFieldValue("password", "")
    }, [isPrivate])

    return (
        <Paper sx={{ flexDirection: "column", padding: "2vw", flex: 1 / 3, gap: "1vw" }}>
            <Title name="Criar sala" />

            <form onSubmit={formik.handleSubmit}>
                <TextField label="Nome da sala" name="name" value={formik.values.name} onChange={formik.handleChange} required />
                <TextField
                    label="Senha"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    disabled={!isPrivate}
                    type={hiddenPassword ? "password" : undefined}
                    slotProps={{
                        input: {
                            endAdornment: isPrivate ? (
                                <IconButton onClick={() => setHiddenPassword((value) => !value)}>
                                    {hiddenPassword ? <Visibility /> : <VisibilityOff />}{" "}
                                </IconButton>
                            ) : (
                                <LockOpen />
                            ),
                        },
                    }}
                />

                <FormControlLabel label="Sala privada" control={<Switch checked={isPrivate} onChange={(_, value) => setPrivate(value)} />} />

                <Button
                    variant="contained"
                    type="submit"
                    sx={{ textTransform: "none" }}
                    disabled={!formik.values.name || !formik.values.owner_id || (isPrivate && !formik.values.password)}
                >
                    {loading ? <CircularProgress size={"1.5rem"} color="inherit" /> : "Criar"}
                </Button>
            </form>
        </Paper>
    )
}
