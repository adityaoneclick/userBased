import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class registerDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  @Length(8, 15)
  password: string;
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;
  @IsEnum(['admin', 'agent'])
  @IsNotEmpty()
  role: string;
}

export class loginDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsString()
  @IsOptional()
  token: string;
}
