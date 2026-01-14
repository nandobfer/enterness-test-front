import { EventsGateway } from "../events/events.gateway";
import { Room, RoomFormDto, RoomAndUserIdsDto } from "./rooms.entity";
import { Socket } from "socket.io";
import { MessageForm } from "../messages/messages.entity";
export declare class RoomsService {
    private readonly users;
    private readonly io;
    constructor(eventsGateway: EventsGateway);
    new(data: RoomFormDto): Promise<Room>;
    find(id: string): Promise<Room>;
    getAll(): Promise<Room[]>;
    handleRoomJoin(socket: Socket, data: RoomAndUserIdsDto, ack?: Function): Promise<void>;
    handleRoomLeave(socket: Socket, data: RoomAndUserIdsDto, ack?: Function): Promise<void>;
    handleMessage(socket: Socket, data: MessageForm, ack: Function): Promise<void>;
}
