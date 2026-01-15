import { Room } from "../rooms/rooms.entity";
import { User, UserDto } from "../users/users.entity";
import { BaseEntity, Relation } from "typeorm";
export declare class MessageForm {
    content: string;
    roomId: string;
    authorId: string;
}
export declare class MessageDto {
    id: string;
    content: string;
    roomId: string;
    createdAt: Date;
    author: UserDto;
}
export declare class Message extends BaseEntity {
    id: string;
    content: string;
    author: Relation<User>;
    room: Relation<Room>;
    createdAt: Date;
    updatedAt: Date;
    constructor();
    getDto(): MessageDto;
}
