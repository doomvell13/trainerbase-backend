import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Session, SessionsSchema } from '../../entities/session.entity';
import { SessionRepository } from '../../repositories/session.repository';
import { ClientModule } from '../client/client.module';
import { Client, ClientSchema } from '../../entities/client.entity';
import { UserModule } from '../user/user.module';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';

@Module({
    imports: [
        UserModule,
        ClientModule,
        MongooseModule.forFeature([{ name: Session.name, schema: SessionsSchema }]),
        MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    ],

    controllers: [SessionController],
    providers: [SessionService, SessionRepository],
    exports: [SessionService, SessionRepository],
})
export class SessionModule {}
