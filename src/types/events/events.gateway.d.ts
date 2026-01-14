import { EventEmitter2 } from "@nestjs/event-emitter";
import { OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { MessageForm } from "../messages/messages.entity";
import { RoomAndUserIdsDto } from "../rooms/rooms.entity";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
export declare class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly users;
    private eventEmitter;
    private jwtService;
    server: Server;
    constructor(users: UsersService, eventEmitter: EventEmitter2, jwtService: JwtService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleUserLogin(client: Socket, userId: string, ack: Function): Promise<void>;
    handleChatJoin(client: Socket, data: RoomAndUserIdsDto, ack: Function): void;
    handleChatLeave(client: Socket, data: RoomAndUserIdsDto, ack: Function): void;
    handleChatMessage(client: Socket, data: MessageForm, ack: Function): void;
}
