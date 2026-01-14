import React, { useState } from "react"
import { Box, Button, Dialog, Divider, IconButton, LinearProgress, TextField, Typography } from "@mui/material"
import { Title } from "../../components/Title"
import { useSignup } from "../../hooks/useSignup"
import { Visibility, VisibilityOff } from "@mui/icons-material"

interface SignupModalProps {
    isOpen: boolean
    onClose: () => void
    signup: ReturnType<typeof useSignup>
}

export const SignupModal: React.FC<SignupModalProps> = (props) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <Dialog
            open={props.isOpen}
            onClose={props.onClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{ sx: { bgcolor: "background.default" }, elevation: 4 }}
        >
            <Box sx={{ padding: 2, flexDirection: "column", gap: 1 }}>
                <Title name="Cadastro" onClose={props.onClose} />
                <Typography variant="subtitle2">insira um e-mail e uma senha para se cadastrar.</Typography>

                <Divider sx={{ marginTop: 1, marginBottom: 1 }} />

                <Box component="form" sx={{ flexDirection: "column", gap: 2 }} onSubmit={props.signup.submitForm}>
                    <TextField
                        label="e-mail"
                        variant="outlined"
                        fullWidth
                        size="small"
                        {...props.signup.register("email")}
                        error={!!props.signup.errors.email}
                        helperText={props.signup.errors.email?.message}
                    />
                    <TextField
                        label="senha"
                        variant="outlined"
                        fullWidth
                        size="small"
                        type={showPassword ? "text" : "password"}
                        {...props.signup.register("password")}
                        error={!!props.signup.errors.password}
                        helperText={props.signup.errors.password?.message}
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
                    <TextField
                        label="confirme a senha"
                        variant="outlined"
                        fullWidth
                        size="small"
                        type={showPassword ? "text" : "password"}
                        {...props.signup.register("password_confirmation")}
                        error={!!props.signup.errors.password_confirmation}
                        helperText={props.signup.errors.password_confirmation?.message}
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

                    <Button type="submit" variant="contained" size="small" disabled={props.signup.isSubmitting}>
                        cadastrar
                    </Button>

                    {props.signup.isSubmitting && <LinearProgress sx={{ position: "absolute", bottom: 0, left: 0, right: 0 }} />}
                </Box>
            </Box>
        </Dialog>
    )
}
