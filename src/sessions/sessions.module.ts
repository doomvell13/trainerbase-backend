import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import SessionsController from './sessions.controller';
import SessionsService from './sessions.service';
import { Session, SessionSchema } from './session.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
  ],
  controllers: [SessionsController],
  providers: [SessionsService],
})
class SessionsModule {}

export default SessionsModule;
