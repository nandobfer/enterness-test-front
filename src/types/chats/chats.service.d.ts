import { Chat, ChatForm, ChatJoinForm } from "../class/Chat";
import { UsersService } from "src/users/users.service";
import { EventsGateway } from "src/events/events.gateway";
import { User } from "src/class/User";
import { MessageForm } from "src/class/Message";
import { Socket } from "socket.io";
export declare class ChatsService {
    private readonly users;
    private readonly io;
    constructor(usersService: UsersService, eventsGateway: EventsGateway);
    new(data: ChatForm): Promise<Chat>;
    find(id: string): Promise<Chat>;
    getAll(): Promise<Chat[]>;
    getUserChats(user_id: string): Promise<Chat[]>;
    removeUser(data: ChatJoinForm, new_owner?: User): Promise<boolean>;
    deleteChat(chat_id: string): Promise<boolean>;
    handleUserLeave(data: ChatJoinForm): Promise<boolean>;
    handleUserLogin(user: User, socket: Socket): Promise<void>;
    handleChatJoin(data: ChatJoinForm, socket: Socket): Promise<void>;
    handleNewMessage(data: MessageForm, socket: Socket): Promise<void>;
}
