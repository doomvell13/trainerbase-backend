import { Expose, Type } from 'class-transformer';
import { UserDto } from 'src/users/dto/users.dtos';

export class GetClientDto {
  @Expose()
  email: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  fullName: string;

  @Expose()
  @Type(() => UserDto)
  trainer: UserDto;
}
