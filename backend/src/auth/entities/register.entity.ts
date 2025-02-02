import { Injectable } from "@nestjs/common";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
} from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Injectable()
@Entity("RegisteredUserData")
export class Register {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;
  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;
  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @Column()
  @IsString()
  @IsStrongPassword()
  password: string;
  @Column()
  @IsString()
  @IsNotEmpty()
  @IsEnum(["admin", "agent"])
  role: string;
}
