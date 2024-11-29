import { Box, lighten } from "@mui/material"
import { theme } from "../style/theme"

export const Title: React.FC<{ name: string; right?: React.ReactNode; left?: React.ReactNode; space?: boolean; center?: boolean }> = ({
    name,
    right,
    left,
}) => {
    return (
        <Box
            sx={{
                color: lighten(theme.text.secondary, 0.3),
                fontWeight: "bold",
                borderBottom: "1px solid",
                paddingBottom: "0.5vw",
                width: "100%",
                fontSize: "1.1vw",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            {left ? <Box>{left}</Box> : null}
            <p
                style={{
                    color: theme.primary,
                }}
            >
                {name}
            </p>
            {right ? right : null}
        </Box>
    )
}
