import { EventsGateway } from "../events/events.gateway";
import { Room, RoomFormDto, JoinRoomDto } from "./rooms.entity";
import { UsersService } from "../users/users.service";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Socket } from "socket.io";
import { MessageForm } from "../messages/messages.entity";
export declare class RoomsService {
    private eventEmitter;
    private readonly users;
    private readonly io;
    constructor(eventsGateway: EventsGateway, usersService: UsersService, eventEmitter: EventEmitter2);
    new(data: RoomFormDto): Promise<Room>;
    find(id: string): Promise<Room>;
    getAll(): Promise<Room[]>;
    countConnectedUsers(roomId: string): number;
    handleRoomJoin(socket: Socket, data: JoinRoomDto, ack?: Function): Promise<void>;
    handleRoomLeave(socket: Socket, data: JoinRoomDto, ack?: Function): Promise<void>;
    handleMessage(socket: Socket, data: MessageForm, ack: Function): Promise<void>;
}
