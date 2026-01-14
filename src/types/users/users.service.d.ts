import { EventEmitter2 } from "@nestjs/event-emitter";
import { Socket } from "socket.io";
import { User, UserFormDto } from "./users.entity";
export declare class UsersService {
    private eventEmitter;
    readonly online_users: User[];
    constructor(eventEmitter: EventEmitter2);
    new(data: UserFormDto): Promise<User>;
    login(data: UserFormDto): Promise<User>;
    find(value: string): Promise<User>;
    getAll(): Promise<User[]>;
    getOnline(): import("./users.entity").UserDto[];
    logout(socket: Socket): void;
    onLogin(socket: Socket, userId: string, ack: Function): Promise<User>;
}
