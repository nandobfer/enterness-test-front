import { EventEmitter2 } from "@nestjs/event-emitter";
import { Socket } from "socket.io";
import { User, UserDto, UserFormDto } from "./users.entity";
export declare class UsersService {
    private eventEmitter;
    readonly online_users: User[];
    constructor(eventEmitter: EventEmitter2);
    new(data: UserFormDto): Promise<User>;
    login(data: UserFormDto): Promise<User>;
    find(value: string): Promise<User>;
    getAll(): Promise<User[]>;
    getOnline(): UserDto[];
    onSocketConnect(socket: Socket, dto: UserDto): Promise<void>;
}
