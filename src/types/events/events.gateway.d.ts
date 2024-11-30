import { OnGatewayDisconnect } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { UserForm } from "src/class/User";
import { UsersService } from "src/users/users.service";
export declare class EventsGateway implements OnGatewayDisconnect {
    private readonly users;
    server: Server;
    constructor(usersService: UsersService);
    handleDisconnect(client: Socket): void;
    handleMessage(client: Socket, data: UserForm): import("src/class/User").User;
}
