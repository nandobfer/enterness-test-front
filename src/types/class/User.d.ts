import { Prisma } from "@prisma/client";
import { Socket } from "socket.io";
export type UserPrisma = Prisma.UserGetPayload<{}>;
export type UserStatus = "available" | "idle";
export declare class UserForm {
    username: string;
}
export declare class User {
    id: string;
    username: string;
    status: UserStatus;
    socket?: Socket;
    constructor(data: UserPrisma, socket?: Socket);
    toJSON(): this & {
        socket: any;
    };
}
