import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"

interface MessageAuthorProps {
    author?: string | null
}

const authors_colors: { author: string; color: string }[] = []
const random_colors = [
    "#43A047", // Green 600
    "#FFC107", // Amber 500
    "#F57C00", // Orange 700
    "#689F38", // Light Green 700
    "#0288D1", // Light Blue 700
    "#009688", // Teal 500
    "#FF335B",
    "#CDDC39", // Lime 500
    "#FF9800", // Orange 500
    "#1976D2", // Blue 700
    "#FFEB3B", // Yellow 500
    "#AFB42B", // Lime 700
    "#E64A19", // Deep Orange 700
    "#4CAF50", // Green 500
    "#039BE5", // Light Blue 600
    "#FFA000", // Amber 700
    "#1E88E5", // Blue 600
    "#00ACC1", // Cyan 600
    "#FF5722", // Deep Orange 500
    "#388E3C", // Green 700
    "#03A9F4", // Light Blue 500
    "#0097A7", // Cyan 700
    "#8BC34A", // Light Green 500
    "#C0CA33", // Lime 600
    "#FBC02D", // Yellow 700
    "#2196F3", // Blue 500
    "#00796B", // Teal 700
    "#FFEB3B", // Yellow 500
    "#5E35B1", // Deep Purple 600
    "#0D47A1", // Blue 900
]

export const MessageAuthor: React.FC<MessageAuthorProps> = ({ author }) => {
    const [authorColor, setAuthorColor] = useState("")

    useEffect(() => {
        if (author) {
            if (!authors_colors.find((item) => item.author === author)) {
                const newColor = random_colors[authors_colors.length % random_colors.length] // Use modulo to cycle through colors
                authors_colors.push({ author: author, color: newColor })
            }

            const color_index = authors_colors.findIndex((item) => item.author === author)
            setAuthorColor(authors_colors[color_index].color)
        }
    }, [])

    return (
        <Box
            sx={{
                fontSize: "0.85rem",
                fontWeight: "bold",
                alignItems: "center",
            }}
        >
            <Box sx={{ color: authorColor }}>{author}</Box>
        </Box>
    )
}
