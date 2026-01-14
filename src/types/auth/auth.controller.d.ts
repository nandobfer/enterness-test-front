import { AuthService } from "./auth.service";
import { UserFormDto } from "../users/users.entity";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(data: UserFormDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    refreshToken(refresh_token: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
