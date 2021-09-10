import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientSchema, Client } from './client.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
  ],
  providers: [ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}
