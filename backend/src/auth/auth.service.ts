import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { loginDTO, registerDTO } from "./dto/auth.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Register } from "./entities/register.entity";
import { Repository } from "typeorm";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Register)
    private registerRepository: Repository<Register>,
  ) {}
  async getUser(id: number) {
    const User = await this.registerRepository.findOne({
      where: { id: id },
    });
    if (User) {
      return {
        message: "User Found",
        data: { email: User.email, name: User.name, role: User.role },
      };
    } else {
      throw new NotFoundException("User Not Found");
    }
  }
  async registerUser(Users: registerDTO) {
    const existingUser = await this.registerRepository.findOne({
      where: { email: Users.email },
    });
    if (existingUser) {
      throw new BadRequestException("User already exists");
    }
    if (Users.password === Users.confirmPassword) {
      Users.password = bcrypt.hashSync(Users.password, 10);
      return {
        message: "User Registered",
        data: await this.registerRepository.save(Users),
      };
    } else {
      throw new UnauthorizedException("Passwords are not matching!!");
    }
  }
  async loginUser(UserData: loginDTO) {
    const validatedUser = await this.registerRepository.findOne({
      where: { email: UserData.email },
    });
    if (
      validatedUser &&
      bcrypt.compareSync(UserData.password, validatedUser.password)
    ) {
      const token = jwt.sign(
        { email: UserData.email },
        JSON.stringify(process.env.SECRET_KEY),
        { expiresIn: 60 * 5 }, // 5 minute TOken Expiration
      );
      UserData.token = `Bearer ${token}`;
      return {
        message: "Login Successful",
        data: {
          email: UserData.email,
          token: UserData.token,
          role: validatedUser.role,
        },
      };
    } else {
      throw new NotFoundException("Invalid Credentials");
    }
  }
}
