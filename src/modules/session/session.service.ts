import { Injectable } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from 'src/dto/getQueryDto';

import { SessionRepository } from '../../repositories/session.repository';
import { UserService } from '../user/user.service';
import { CreateSessionDto } from './dto/createSession.dto';
import { UpdateSessionDto } from './dto/updateSession.dto';

@Injectable()
export class SessionService {
    constructor(private sessionRepository: SessionRepository, private readonly userService: UserService) {}

    async createSession(createSessionDto: CreateSessionDto) {
        return await this.sessionRepository.createSession(createSessionDto);
    }

    async getSessionById(sessionId: MongooseSchema.Types.ObjectId) {
        return await this.sessionRepository.getSessionById(sessionId);
    }

    async getSessions(getQueryDto: GetQueryDto) {
        return await this.sessionRepository.getSessions(getQueryDto);
    }

    async updateSession(updateSessionDto: UpdateSessionDto) {
        const session = await this.sessionRepository.updateSession(updateSessionDto);
        return session;
    }
}
