import { ChatsService } from "./chats.service";
import { ChatForm } from "src/class/Chat";
export declare class ChatsController {
    private service;
    constructor(service: ChatsService);
    getAll(): Promise<import("src/class/Chat").Chat[]>;
    createChat(data: ChatForm): Promise<import("src/class/Chat").Chat>;
    getUserChats(user_id: string): Promise<import("src/class/Chat").Chat[]>;
    removeUserFromChat(user_id: string, chat_id: string): Promise<boolean>;
}
