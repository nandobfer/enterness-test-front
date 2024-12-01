import { Chat, ChatForm } from "../class/Chat";
import { UsersService } from "src/users/users.service";
import { EventsGateway } from "src/events/events.gateway";
export declare class ChatsService {
    private readonly users;
    private readonly io;
    constructor(usersService: UsersService, eventsGateway: EventsGateway);
    new(data: ChatForm): Promise<Chat>;
    getAll(): Promise<Chat[]>;
    getUserChats(user_id: string): Promise<Chat[]>;
}
