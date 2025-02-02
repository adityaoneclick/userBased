import { loginDTO, registerDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getUser(id: number): Promise<{
        message: string;
        data: {
            email: string;
            name: string;
            role: string;
        };
    }>;
    registerUser(User: registerDTO): Promise<{
        message: string;
        data: registerDTO & import("./entities/register.entity").Register;
    }>;
    loginUser(UserData: loginDTO): Promise<{
        message: string;
        data: {
            email: string;
            token: string;
            role: string;
        };
    }>;
}
