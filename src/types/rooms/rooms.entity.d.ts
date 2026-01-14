import { BaseEntity, Relation } from "typeorm";
import { User } from "../users/users.entity";
import { Message } from "../messages/messages.entity";
export declare class RoomFormDto {
    name: string;
    password?: string;
    user_id: string;
}
export declare class RoomAndUserIdsDto {
    room_id: string;
    user_id: string;
}
export declare class RoomDto {
    id: string;
    name: string;
}
export declare class Room extends BaseEntity {
    id: string;
    name: string;
    password?: string;
    users: Relation<User>[];
    messages: Relation<Message>[];
    createdAt: Date;
    updatedAt: Date;
    constructor();
    getDto(): RoomDto;
    validatePassword(password: string): Promise<boolean>;
}
