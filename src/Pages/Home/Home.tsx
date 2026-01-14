import React, { useState } from "react"
import { Box, Button, Divider, IconButton, LinearProgress, Paper, TextField, Typography } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useLogin } from "../../hooks/useLogin"
import { SignupModal } from "./SignupModal"
import { useSignup } from "../../hooks/useSignup"

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
    const [showPassword, setShowPassword] = useState(false)
    const [signupOpen, setSignupOpen] = useState(false)

    const login = useLogin()
    const signup = useSignup(login, () => setSignupOpen(false))

    return (
        <Box sx={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <form onSubmit={login.submitForm}>
                <Paper sx={{ padding: 3, flexDirection: "column", gap: 2, position: "relative" }}>
                    <Box sx={{ flexDirection: "column" }}>
                        <Typography variant="h5">Login</Typography>
                        <Typography variant="subtitle2">Por favor, entre com e-mail e senha.</Typography>
                    </Box>

                    <Divider />

                    <TextField
                        label="e-mail"
                        variant="outlined"
                        fullWidth
                        size="small"
                        {...login.register("email")}
                        error={!!login.errors.email}
                        helperText={login.errors.email?.message}
                    />
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
                        {...login.register("password")}
                        error={!!login.errors.password}
                        helperText={login.errors.password?.message}
                    />

                    <Button type="submit" variant="contained" size="small" disabled={login.isSubmitting}>
                        entrar
                    </Button>
                    <Button variant="outlined" size="small" disabled={login.isSubmitting} onClick={() => setSignupOpen(true)}>
                        cadastrar-se
                    </Button>

                    {login.isSubmitting && <LinearProgress sx={{ position: "absolute", bottom: 0, left: 0, right: 0 }} />}
                </Paper>
            </form>

            <SignupModal isOpen={!login.isSubmitting && signupOpen} onClose={() => setSignupOpen(false)} signup={signup} />
        </Box>
    )
}
