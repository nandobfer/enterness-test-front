import React, { useEffect, useRef } from "react"
import { Paper } from "@mui/material"
import { Message } from "../../types/class/Message"
import { MessageContainer } from "./MessageContainer"

interface MessagesContainerProps {
    messages: Message[]
}

interface AlwaysScrollToBottomProps {
    shouldScroll: React.MutableRefObject<boolean>
}

const AlwaysScrollToBottom: React.FC<AlwaysScrollToBottomProps> = ({ shouldScroll }) => {
    const elementRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (shouldScroll.current) {
            elementRef.current?.scrollIntoView({ behavior: "smooth" })
            shouldScroll.current = false
        }
    }, [shouldScroll.current])

    return <div ref={elementRef} />
}

export const MessagesContainer: React.FC<MessagesContainerProps> = ({ messages }) => {
    const shouldScroll = useRef<boolean>(true)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        containerRef.current?.scrollBy({ top: 1000000000, behavior: "smooth" })
    }, [messages])

    return (
        <Paper
            ref={containerRef}
            sx={{
                borderTopRightRadius: "2vw",
                borderBottomLeftRadius: "2vw",
                flexDirection: "column",
                padding: "1vw",
                gap: "0.5vw",
                bgcolor: "",
                height: "65vh",
                overflowY: "auto",

                "::-webkit-scrollbar-thumb": {
                    backgroundColor: "primary.main",
                },
            }}
        >
            {messages
                .sort((a, b) => Number(a.createdAt) - Number(b.createdAt))
                .map((item, index) => (
                    <MessageContainer message={item} key={item.id} previousMessage={messages[index - 1]} />
                ))}
            <AlwaysScrollToBottom shouldScroll={shouldScroll} />
        </Paper>
    )
}
