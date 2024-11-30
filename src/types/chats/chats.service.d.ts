import { Chat, ChatForm } from "../class/Chat";
import { UsersService } from "src/users/users.service";
import { EventsGateway } from "src/events/events.gateway";
import { User } from "src/class/User";
export declare class ChatsService {
    private readonly users;
    private readonly io;
    private readonly chats;
    constructor(usersService: UsersService, eventsGateway: EventsGateway);
    new(data: ChatForm): Chat;
    getAll(): Chat[];
    getUserChats(user_id: string): Chat[];
    removeChat(index: number): void;
    handleUserDisconnect(user: User): void;
}
