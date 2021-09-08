import { IsString, IsNotEmpty, IsEmail, IsBoolean } from 'class-validator';

export class CreateUserDto {
  id: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  isTrainer: boolean;
}
