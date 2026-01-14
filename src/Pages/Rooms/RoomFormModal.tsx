import React, { useState } from "react"
import { Box, Button, Dialog, Divider, IconButton, LinearProgress, TextField, Typography } from "@mui/material"
import { useRooms } from "../../hooks/useRooms"
import { Title } from "../../components/Title"
import { Visibility, VisibilityOff } from "@mui/icons-material"

interface RoomFormModalProps {
    rooms: ReturnType<typeof useRooms>
}

export const RoomFormModal: React.FC<RoomFormModalProps> = (props) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <Dialog
            open={props.rooms.roomFormModal}
            onClose={() => props.rooms.setRoomFormModal(false)}
            fullWidth
            maxWidth="sm"
            slotProps={{ paper: { sx: { bgcolor: "background.default" }, elevation: 4 } }}
        >
            <Box sx={{ padding: 2, flexDirection: "column", gap: 1 }}>
                <Title name="Nova sala" onClose={() => props.rooms.setRoomFormModal(false)} />
                <Typography variant="subtitle2">insira um nome e uma senha para a sala.</Typography>
                <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

                <Box component="form" sx={{ flexDirection: "column", gap: 2 }} onSubmit={() => null}>
                    <TextField label="nome" fullWidth size="small" />
                    <TextField
                        label="senha"
                        variant="outlined"
                        fullWidth
                        size="small"
                        type={showPassword ? "text" : "password"}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <IconButton onClick={() => setShowPassword((value) => !value)}>
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                ),
                            },
                        }}
                    />
                    <Button type="submit" variant="contained" size="small">
                        cadastrar
                    </Button>
                </Box>
            </Box>
            {<LinearProgress sx={{ position: "absolute", bottom: 0, left: 0, right: 0 }} />}
        </Dialog>
    )
}
