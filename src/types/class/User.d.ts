import { Socket } from "socket.io";
import { WithoutFunctions } from "src/helpers";
export type UserStatus = "available" | "idle";
export declare class UserForm {
    username: string;
}
export declare class User {
    id: string;
    username: string;
    status: UserStatus;
    socket: Socket;
    constructor(data: WithoutFunctions<User>);
    toJSON(): this & {
        socket: any;
    };
}
