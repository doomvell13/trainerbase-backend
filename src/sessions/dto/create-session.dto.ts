import { IsString, IsNotEmpty, IsDate, IsBoolean } from 'class-validator';

export class CreateSessionDTO {
  @IsString()
  @IsNotEmpty()
  sessionID: string;

  @IsString()
  @IsNotEmpty()
  client_uid: string;

  @IsString()
  @IsNotEmpty()
  trainer_uid: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDate()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  start: string;

  @IsString()
  @IsNotEmpty()
  end: string;

  @IsString()
  @IsNotEmpty()
  readonly date_posted: string;

  @IsBoolean()
  // or @IsBooleanString() ?
  @IsNotEmpty()
  readonly verification: boolean;
}
