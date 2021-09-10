import { IsString, IsNotEmpty } from 'class-validator';

export class SessionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}

export default SessionDto;
