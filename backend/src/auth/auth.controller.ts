import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { loginDTO, registerDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('/:id')
  getUser(@Param('id') id: number) {
    return this.authService.getUser(id);
  }
  @Post('/register')
  registerUser(@Body(ValidationPipe) User: registerDTO) {
    return this.authService.registerUser(User);
  }
  @Post('/login')
  loginUser(@Body(ValidationPipe) UserData: loginDTO) {
    return this.authService.loginUser(UserData);
  }
}
