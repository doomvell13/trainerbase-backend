import { Expose, Type } from 'class-transformer';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { UserDto } from 'src/users/dto/users.dtos';
import { Schema as MongooseSchema } from 'mongoose';

export class CreateClientDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  // @IsString()
  // clientId: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  role: any;

  @IsString()
  @IsNotEmpty()
  trainerId: any;
}

export class GetClientDto {
  @Expose()
  id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  @Type(() => UserDto)
  trainer: UserDto;
}
