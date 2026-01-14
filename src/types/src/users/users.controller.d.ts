import { UsersService } from "./users.service";
import { UserFormDto } from "./users.entity";
declare class UserQueriesDto {
    email: string;
}
declare class UserParams {
    id: string;
}
export declare class UsersController {
    private service;
    constructor(service: UsersService);
    getAll(): Promise<import("./users.entity").User[]>;
    getOnlineUsers(): import("./users.entity").UserDto[];
    createUser(data: UserFormDto): Promise<import("./users.entity").User>;
    checkEmail(query: UserQueriesDto): {
        valid: boolean;
    };
    getUserById(params: UserParams): Promise<import("./users.entity").User>;
}
export {};
