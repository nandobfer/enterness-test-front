import { EventEmitter2 } from "@nestjs/event-emitter";
import { OnGatewayDisconnect } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatJoinForm } from "src/class/Chat";
import { MessageForm } from "src/class/Message";
import { UserForm } from "src/class/User";
import { UsersService } from "src/users/users.service";
export declare class EventsGateway implements OnGatewayDisconnect {
    private readonly users;
    private eventEmitter;
    server: Server;
    constructor(users: UsersService, eventEmitter: EventEmitter2);
    handleDisconnect(client: Socket): void;
    handleLogin(client: Socket, data: UserForm): Promise<import("src/class/User").User>;
    handleChatJoin(client: Socket, data: ChatJoinForm): void;
    handleChatMessage(client: Socket, data: MessageForm): void;
}
