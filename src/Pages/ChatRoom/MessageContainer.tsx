import React from "react"
import { Box, darken } from "@mui/material"
import { Message } from "../../types/class/Message"
import { DateChip } from "../../components/DateChip"
import { useUser } from "../../hooks/useUser"
import { MessageAuthor } from "../../components/MessageAuthor"
import { TrianguloMiseravel } from "../../components/TrianguloMiseravel"
import { theme } from "../../style/theme"
import { MessageDateContainer } from "../../components/MessageDateContainer"

interface MessageContainerProps {
    message: Message
    previousMessage?: Message
}

export const MessageContainer: React.FC<MessageContainerProps> = ({ message, previousMessage }) => {
    const { user } = useUser()

    const from_me = message.author_id === user.current?.id
    const same_as_previous = !!previousMessage && previousMessage?.author_id === message.author_id
    const day_changing =
        !previousMessage ||
        new Date(Number(previousMessage.createdAt)).toLocaleDateString() !== new Date(Number(message.createdAt)).toLocaleDateString()

    const show_triangle = !same_as_previous || day_changing
    const show_author = !from_me && (!same_as_previous || day_changing)

    const primary = theme.primary
    const secondary = darken(theme.secondary, 0.5)

    return (
        <Box sx={{ display: "contents" }}>
            {/*//* DATE CHIP */}
            {day_changing && <DateChip timestamp={message.createdAt} />}
            <Box sx={{ flexDirection: from_me ? "row-reverse" : "row", alignItems: "center", gap: "1vw" }}>
                <Box
                    sx={{
                        flexDirection: "column",
                        maxWidth: "75%",
                    }}
                >
                    <Box
                        sx={{
                            minWidth: "5vw",
                            position: "relative",
                            padding: "0.5vw",
                            flexDirection: "column",
                            alignSelf: from_me ? "flex-end" : "flex-start",
                            textAlign: from_me ? "end" : "start",
                            borderRadius: "0.75vw",
                            borderTopRightRadius: show_triangle && from_me ? "0" : undefined,
                            borderTopLeftRadius: show_triangle && !from_me ? "0" : undefined,
                            bgcolor: from_me ? primary : secondary,
                            marginTop: !same_as_previous && !day_changing ? "0.5vw" : undefined,
                        }}
                    >
                        {show_triangle && <TrianguloMiseravel color={from_me ? primary : secondary} alignment={from_me ? "right" : "left"} />}

                        {/*//* MESSAGE AUTHOR  */}
                        {show_author && <MessageAuthor author={message.author_username} />}

                        <Box
                            sx={{
                                flexDirection: "column",
                            }}
                        >
                            {/*//* MESSAGE BODY TEXT */}
                            <Box sx={{ flexDirection: "column" }}>
                                <p
                                    style={{
                                        wordBreak: "break-word",
                                        whiteSpace: "pre-line",
                                        textAlign: "left",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    {message.body}
                                </p>
                            </Box>
                        </Box>
                        {/*//* TIME */}
                        <MessageDateContainer message={message} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
