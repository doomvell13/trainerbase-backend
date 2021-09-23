import { Expose, Type } from 'class-transformer';
import { GetClientDto } from 'src/clients/dto/getClient.dto';

export class UserDto {
  @Expose()
  email: string;

  @Expose()
  @Type(() => GetClientDto)
  clients: GetClientDto;
}
