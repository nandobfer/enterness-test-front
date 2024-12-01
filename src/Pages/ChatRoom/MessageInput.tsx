import React, { useState } from "react"
import { Box, IconButton, TextField } from "@mui/material"
import { Send } from "@mui/icons-material"

interface MessageInputProps {
    onSubmit: (text: string) => void
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSubmit }) => {
    const [text, setText] = useState("")

    const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()

        if (!text) return
        onSubmit(text)
        setText("")
    }
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                placeholder="Enviar mensagem"
                value={text}
                onChange={(ev) => setText(ev.target.value)}
                slotProps={{
                    input: {
                        endAdornment: (
                            <IconButton color="primary" type="submit" disabled={!text}>
                                <Send />
                            </IconButton>
                        ),
                    },
                }}
            />
        </form>
    )
}
