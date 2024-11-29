import { UsersService } from "./users.service";
import { UserForm } from "src/class/User";
export declare class UsersController {
    private service;
    constructor(service: UsersService);
    getAll(): import("src/class/User").User[];
    checkUsername(username: string): {
        valid: boolean;
    };
    createUser(data: UserForm): import("src/class/User").User;
}
