import { JwtService } from "@nestjs/jwt";
import { UserDto } from "../users/users.entity";
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    generateTokens(user: UserDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    signIn(email: string, password: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    refreshToken(refresh_token: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
