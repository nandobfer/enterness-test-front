import { EventEmitter2 } from "@nestjs/event-emitter";
import { Socket } from "socket.io";
import { User, UserForm } from "src/class/User";
export declare class UsersService {
    private eventEmitter;
    private readonly online_users;
    constructor(eventEmitter: EventEmitter2);
    new(data: UserForm): Promise<User>;
    login(data: UserForm, socket: Socket): Promise<User>;
    getAll(): Promise<User[]>;
    find(attribute: "id" | "username", value: string): Promise<User | null>;
    isOnline(username: string): User;
    logout(socket: Socket): void;
}
