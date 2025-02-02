import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Register } from './entities/register.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Register])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
