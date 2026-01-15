import React, { useState } from "react"
import { Box, Button, Dialog, Divider, IconButton, LinearProgress, TextField, Typography } from "@mui/material"
import { useJoinRoom } from "../../../hooks/useJoinRoom"
import { useRooms } from "../../../hooks/useRooms"
import { Title } from "../../../components/Title"
import { Visibility, VisibilityOff } from "@mui/icons-material"

interface JoinRoomModalProps {
    rooms: ReturnType<typeof useRooms>
}

export const JoinRoomModal: React.FC<JoinRoomModalProps> = (props) => {
    const [showPassword, setShowPassword] = useState(false)
    const room = props.rooms.joiningRoom

    const closeModal = () => {
        props.rooms.setJoiningRoom(null)
    }
    const form = useJoinRoom(room, closeModal)


    return (
        <Dialog
            open={!!room}
            onClose={closeModal}
            fullWidth
            maxWidth="sm"
            slotProps={{ paper: { sx: { bgcolor: "background.default" }, elevation: 4 } }}
        >
            <Box sx={{ padding: 2, flexDirection: "column", gap: 2 }}>
                <Title name={room?.name || ''} onClose={closeModal} />
                <Typography variant="subtitle2">você não faz parte desta sala, deseja entrar?</Typography>
                <Divider sx={{ marginBottom: 1 }} />

                <Box component="form" sx={{ flexDirection: "column", gap: 2 }} onSubmit={form.submitForm}>
                    {room?.isPrivate && (
                        <TextField
                            label="senha"
                            variant="outlined"
                            fullWidth
                            size="small"
                            type={showPassword ? "text" : "password"}
                            {...form.register("password")}
                            error={!!form.errors.password}
                            helperText={form.errors.password?.message}
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
                    )}
                    <Button type="submit" variant="contained" size="small" disabled={form.isSubmitting}>
                        entrar
                    </Button>
                </Box>
            </Box>
            {form.isSubmitting && <LinearProgress sx={{ position: "absolute", bottom: 0, left: 0, right: 0 }} />}
        </Dialog>
    )
}
