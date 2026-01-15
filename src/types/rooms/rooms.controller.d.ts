import { RoomsService } from "./rooms.service";
import { RoomFormDto } from "./rooms.entity";
export declare class RoomsController {
    private service;
    constructor(service: RoomsService);
    getAll(): Promise<import("./rooms.entity").RoomDto[]>;
    createRoom(data: RoomFormDto): Promise<import("./rooms.entity").RoomDto>;
    countConnectedUsers(id: string): Promise<number>;
}
