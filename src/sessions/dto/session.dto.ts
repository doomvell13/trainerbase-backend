import { Expose, Type } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';
import { GetClientDto } from 'src/clients/dto/getClient.dto';
import { UserDto } from 'src/users/dto/users.dtos';

export class SessionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  clientId: string;
}

export class GetSessionDto {
  @Expose()
  content: string;

  @Expose()
  @Type(() => GetClientDto)
  client: GetClientDto;

  @Expose()
  @Type(() => UserDto)
  trainer: UserDto;
}
