import { Expose, Type } from 'class-transformer';

import { UserDto } from 'src/users/dto/users.dtos';

export class GetClientDto {
  @Expose()
  id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  // @Expose()
  // @Type(() => GetClientDto)
  // client: GetClientDto;

  @Expose()
  @Type(() => UserDto)
  trainer: UserDto;
}
