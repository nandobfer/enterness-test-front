import { Socket } from "socket.io";
import { BaseEntity, Relation } from "typeorm";
import { Message } from "../messages/messages.entity";
import { Room } from "../rooms/rooms.entity";
export declare class UserFormDto {
    email: string;
    password: string;
}
export declare class UserDto {
    id: string;
    email: string;
}
export declare class User extends BaseEntity {
    id: string;
    email: string;
    password: string;
    messages: Relation<Message>[];
    rooms: Relation<Room>[];
    createdAt: Date;
    updatedAt: Date;
    socket?: Socket;
    constructor();
    getDto(): UserDto;
    validatePassword(password: string): Promise<boolean>;
}
