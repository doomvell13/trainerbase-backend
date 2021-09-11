import { Expose } from 'class-transformer';

export class GetClientDto {
  @Expose()
  email: string;

  @Expose()
  firstName: string;
}
