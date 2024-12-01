import { Prisma } from "@prisma/client";
export type MessagePrisma = Prisma.MessageGetPayload<{}>;
export declare class Message {
    id: string;
    body: string;
    author_id: string;
    constructor(data: MessagePrisma);
}
