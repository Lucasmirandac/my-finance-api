// create-user.dto.ts
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  IsDate,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsDate()
  dateOfBirth?: string;
}
