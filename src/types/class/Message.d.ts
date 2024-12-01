import { Prisma } from "@prisma/client";
export type MessagePrisma = Prisma.MessageGetPayload<{}>;
export interface MessageForm {
    id: string;
    body: string;
    chat_id: string;
    user_id: string;
}
export declare class Message {
    id: string;
    body: string;
    author_id: string;
    createdAt: string;
    constructor(data: MessagePrisma);
}
