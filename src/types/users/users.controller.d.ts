import { UsersService } from "./users.service";
export declare class UsersController {
    private service;
    constructor(service: UsersService);
    getAll(): import("src/class/User").User[];
    checkUsername(username: string): {
        valid: boolean;
    };
}
