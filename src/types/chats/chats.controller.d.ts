import { ChatsService } from "./chats.service";
import { ChatForm } from "src/class/Chat";
export declare class ChatsController {
    private service;
    constructor(service: ChatsService);
    getAll(): import("src/class/Chat").Chat[];
    createChat(data: ChatForm): import("src/class/Chat").Chat;
    getUserChats(user_id: string): import("src/class/Chat").Chat[];
}
