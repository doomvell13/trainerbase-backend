import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import SessionsController from './sessions.controller';
import SessionsService from './sessions.service';
import { Session, SessionSchema } from './session.schema';
import { Client, ClientSchema } from 'src/clients/client.schema';
import { User, UserSchema } from 'src/users/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Session.name, schema: SessionSchema },
      { name: Client.name, schema: ClientSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [SessionsController],
  providers: [SessionsService],
})
class SessionsModule {}

export default SessionsModule;
