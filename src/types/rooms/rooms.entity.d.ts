import { BaseEntity, Relation } from "typeorm";
import { User, UserDto } from "../users/users.entity";
import { Message, MessageDto } from "../messages/messages.entity";
export declare class RoomFormDto {
    name: string;
    password?: string;
    user_id: string;
}
export declare class JoinRoomDto {
    room_id: string;
    user_id: string;
    password?: string;
}
export declare class RoomDto {
    id: string;
    name: string;
    users: UserDto[];
    lastMessage: MessageDto | null;
    createdAt: Date;
    isPrivate: boolean;
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
    get lastMessage(): Message | undefined;
    getDto(): RoomDto;
    validatePassword(password: string): Promise<boolean>;
}
