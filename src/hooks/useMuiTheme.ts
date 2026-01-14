import { createTheme } from "@mui/material"
// import { useMemo } from "react"
import { useMemo } from "react"
import { theme } from "../style/theme"

export const useMuiTheme = () => {
    const colors = theme
    const THEME = useMemo(
        () =>
            createTheme({
                typography: {
                    fontFamily: ["Montserrat", "Futura Medium BT"].join(","),
                },
                palette: {
                    mode: "dark",

                    primary: {
                        main: colors.primary,
                    },
                    secondary: {
                        main: colors.secondary,
                    },

                    background: {
                        default: colors.background.primary,
                        paper: colors.background.secondary,
                    },

                    text: {
                        primary: colors.text.primary,
                        secondary: colors.text.secondary,
                    },

                    success: {
                        main: colors.success,
                    },

                    warning: {
                        main: colors.warning,
                    },
                },
                components: {
                    MuiDialog: {
                        defaultProps: {
                            slotProps: {
                                paper: {
                                    sx: { display: "flex", padding: 2, flexDirection: "column", gap: 2 },
                                    elevation: undefined,
                                },
                            },
                        },
                    },
                    MuiCircularProgress: { defaultProps: { size: "1.5rem", color: "inherit" } },
                    MuiTooltip: { defaultProps: { arrow: true } },
                    MuiSkeleton: { defaultProps: { animation: "wave" } },
                },
            }),
        [colors]
    )

    return THEME
}
