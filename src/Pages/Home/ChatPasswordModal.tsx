import React, { useState } from "react"
import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import { Chat } from "../../types/class/Chat"
import { useUser } from "../../hooks/useUser"

interface ChatPasswordModalProps {
    chat: Chat
    opened: boolean
    handleClose: () => void
    onSuccess: () => void
}

export const ChatPasswordModal: React.FC<ChatPasswordModalProps> = ({ chat, opened, handleClose, onSuccess }) => {
    const { user } = useUser()

    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleTextChange = (text: string) => {
        setError("")
        setPassword(text)
    }

    const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()

        if (password === chat.password) {
            onSuccess()
            handleClose()
        } else {
            setError("Senha inválida")
        }
    }

    return (
        <Dialog
            open={opened}
            PaperProps={{ sx: { bgcolor: "background.default" } }}
            slotProps={{ backdrop: { sx: { backdropFilter: "blur(5px)", background: "transparent" } } }}
            onClose={handleClose}
        >
            <DialogTitle>Sala privada</DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "1vw" }}>
                <DialogContentText>Por favor, digite a senha da sala para participar.</DialogContentText>
                <form onSubmit={(ev) => handleSubmit(ev)}>
                    <TextField
                        label="Senha da sala"
                        onChange={(ev) => handleTextChange(ev.target.value)}
                        value={password}
                        error={!!error}
                        helperText={error}
                    />
                    <Box sx={{ alignSelf: "flex-end", gap: "1vw" }}>
                        <Button onClick={handleClose}>cancelar</Button>
                        <Button variant="contained" type="submit" disabled={!!error || !password}>
                            confirmar
                        </Button>
                    </Box>
                </form>
            </DialogContent>
        </Dialog>
    )
}
