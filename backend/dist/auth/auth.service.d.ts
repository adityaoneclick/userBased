import { loginDTO, registerDTO } from './dto/auth.dto';
import { Register } from './entities/register.entity';
import { Repository } from 'typeorm';
export declare class AuthService {
    private registerRepository;
    constructor(registerRepository: Repository<Register>);
    getUser(id: number): Promise<{
        message: string;
        data: {
            email: string;
            name: string;
        };
    } | {
        message: string;
        data?: undefined;
    }>;
    registerUser(Users: registerDTO): Promise<{
        message: string;
        data: registerDTO & Register;
    }>;
    loginUser(UserData: loginDTO): Promise<{
        message: string;
        data: {
            email: string;
            token: string;
        };
    }>;
}
