import React from "react"
import { Chip } from "@mui/material"
import { formatDate } from "../tools/formatDate"

interface DateChipProps {
    timestamp: string | number
}

export const DateChip: React.FC<DateChipProps> = ({ timestamp }) => {
    return (
        <Chip
            label={formatDate(new Date(Number(timestamp)), "date-only")}
            sx={{
                width: "fit-content",
                alignSelf: "center",
                margin: "2vw 0",
                fontSize: "0.8rem",
                padding: "1vw",
                color: "secondary.main",
            }}
        />
    )
}
