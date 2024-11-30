import { EventEmitter2 } from "@nestjs/event-emitter";
import { Socket } from "socket.io";
import { User, UserForm } from "src/class/User";
export declare class UsersService {
    private eventEmitter;
    private readonly users;
    constructor(eventEmitter: EventEmitter2);
    new(data: UserForm, socket: Socket): User;
    getAll(): User[];
    findById(id: string): User;
    findByUsername(username: string): User;
    findBySocketId(socket: Socket): User;
    onDisconnect(socket: Socket): void;
}
