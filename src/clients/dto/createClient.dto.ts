import { IsString, IsNotEmpty, IsDate } from 'class-validator';
import { UserDto } from 'src/users/dto/users.dtos';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  role: string;
}

export default CreateClientDto;
