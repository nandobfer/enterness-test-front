import { Message, MessageForm } from "./Message";
import { User } from "./User";
import { Prisma } from "@prisma/client";
export declare const chat_prisma_include: {
    users: true;
    messages: {
        orderBy: {
            createdAt: "asc";
        };
    };
    owner: true;
};
export type ChatPrisma = Prisma.ChatGetPayload<{
    include: typeof chat_prisma_include;
}>;
export declare class ChatJoinForm {
    chat_id: string;
    user_id: string;
}
export declare class ChatForm {
    owner_id: string;
    name: string;
    password?: string;
}
export declare class Chat {
    id: string;
    name: string;
    messages: Message[];
    owner: User;
    users: User[];
    createdAt: string;
    lastMessage?: Message;
    password?: string;
    constructor(data: ChatPrisma);
    registerUser(user: User): Promise<void>;
    newMessage(data: MessageForm): Promise<Message>;
}
