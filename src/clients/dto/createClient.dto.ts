import { Expose, Type } from 'class-transformer';
import { UserDto } from 'src/users/dto/users.dtos';

export class CreateClientDto {
  email: string;

  firstName: string;

  lastName: string;

  role: string;
}

export default CreateClientDto;
