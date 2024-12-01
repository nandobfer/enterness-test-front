import React from "react"
import { Box } from "@mui/material"

interface TrianguloMiseravelProps {
    color: string
    alignment: "left" | "right"
}

export const TrianguloMiseravel: React.FC<TrianguloMiseravelProps> = ({ color, alignment }) => {
    const size = "0.6vw"
    const offset = "0.55vw"

    return (
        <Box
            sx={{
                width: 0,
                height: 0,
                borderLeft: alignment === "left" ? `${size} solid transparent` : undefined,
                borderRight: alignment === "right" ? `${size} solid transparent` : undefined,
                borderTop: `${size} solid ${color}`,
                position: "absolute",
                top: 0,
                [alignment]: `-${offset}`,
                borderTopRightRadius: alignment === "right" ? size : undefined,
                borderBottomRightRadius: alignment === "right" ? size : undefined,

                borderTopLeftRadius: alignment === "left" ? size : undefined,
                borderBottomLeftRadius: alignment === "left" ? size : undefined,
            }}
        />
    )
}
