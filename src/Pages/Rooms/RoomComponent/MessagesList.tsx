import React from "react"
import { MessageDto } from "../../../types/messages/messages.entity"
import { Virtuoso } from "react-virtuoso"
import { MessageComponent } from "./MessageComponent"
import { useUser } from "../../../hooks/useUser"
import { Box } from "@mui/material"

interface MessagesListProps {
    messages: MessageDto[]
}

export const MessagesList: React.FC<MessagesListProps> = (props) => {
    const user = useUser()
    const messages = props.messages
    return (
        <Box sx={{ paddingLeft: 3, paddingRight: 3, flexDirection: "column", flex: 1,  }}>
            <Virtuoso
                style={{paddingBottom: 500}}
                data={messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())}
                itemContent={(index, message) => {
                    const previous_message = messages[index - 1]
                    const next_message = messages[index + 1]
                    const is_first = !previous_message
                    const is_last = !next_message
                    // ! mostrando horário caso a diferença entre a mensagem e a anterior ultrapasse 5 minutos
                    const show_datetime =
                        new Date(message.createdAt).getTime() - (previous_message ? new Date(previous_message.createdAt).getTime() : 0) >
                        1000 * 60 * 5
                    return (
                        <MessageComponent
                            message={message}
                            same_as_previous={previous_message?.author.id === message.author.id}
                            same_as_next={next_message?.author.id === message.author.id}
                            last_message={is_last}
                            show_datetime={show_datetime}
                            from_me={message.author.id === user.dto?.id}
                        />
                    )
                }}
                initialTopMostItemIndex={messages.length - 1}
                followOutput={"smooth"}
            />
        </Box>
    )
}
