import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class RegisterClientDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  role: any;

  trainer: any;
}

export default RegisterClientDto;
