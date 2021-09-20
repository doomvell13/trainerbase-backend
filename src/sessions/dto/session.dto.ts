import { Expose, Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsDate } from 'class-validator';
import { GetClientDto } from 'src/clients/dto/getClient.dto';
import { UserDto } from 'src/users/dto/users.dtos';

export class SessionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  // @IsString()
  // clientId: string;

  @IsString()
  start: any;

  @IsString()
  end: any;
}

export class GetSessionDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  // @Expose()
  // @Type(() => GetClientDto)
  // client: GetClientDto;

  @Expose()
  start: string;

  @Expose()
  end: string;

  @Expose()
  @Type(() => UserDto)
  trainer: UserDto;
}
