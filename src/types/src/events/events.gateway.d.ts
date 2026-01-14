import { EventEmitter2 } from "@nestjs/event-emitter";
import { OnGatewayDisconnect } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { MessageForm } from "../messages/messages.entity";
import { RoomAndUserIdsDto } from "../rooms/rooms.entity";
import { UsersService } from "../users/users.service";
export declare class EventsGateway implements OnGatewayDisconnect {
    private readonly users;
    private eventEmitter;
    server: Server;
    constructor(users: UsersService, eventEmitter: EventEmitter2);
    handleDisconnect(client: Socket): void;
    handleUserLogin(client: Socket, userId: string, ack: Function): Promise<void>;
    handleChatJoin(client: Socket, data: RoomAndUserIdsDto, ack: Function): void;
    handleChatLeave(client: Socket, data: RoomAndUserIdsDto, ack: Function): void;
    handleChatMessage(client: Socket, data: MessageForm, ack: Function): void;
}
