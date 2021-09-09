import { InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { GetQueryDto } from '../dto/getQueryDto';
import { Session } from '../entities/session.entity';
import { CreateSessionDto } from '../modules/session/dto/createSession.dto';
import { UpdateSessionDto } from '../modules/session/dto/updateSession.dto';

export class SessionRepository {
    constructor(@InjectModel(Session.name) private readonly sessionModel: Model<Session>) {}

    async createSession(createSessionDto: CreateSessionDto) {
        const newSession = new this.sessionModel({
            user: createSessionDto.userId,
            sessionName: createSessionDto.sessionName,
            status: 'CREATED',
            client: createSessionDto.clientId,
        });
        try {
            const createdSession = await newSession.save();

            return createdSession;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async updateSession(updateSession: UpdateSessionDto) {
        const actualDate = new Date();
        actualDate.toUTCString();

        const updateData = {
            status: updateSession.status,
            client: updateSession.clientId,
            updatedAt: actualDate,
        };

        try {
            const session = await this.sessionModel
                .findOneAndUpdate({ _id: updateSession.id }, updateData, {
                    new: true,
                })
                .exec();
            return session;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getSessions(query: GetQueryDto) {
        // Paginar resultado
        let from = query.from || 0;
        from = Number(from);

        let limit = query.limit || 0;
        limit = Number(limit);

        let sessions: Session[];

        try {
            if (limit === 0) {
                sessions = await this.sessionModel
                    .find()
                    .populate('client')
                    .populate('user', 'name email')
                    .skip(from)
                    .sort({ createdAt: -1 })
                    .exec();
            } else {
                sessions = await this.sessionModel
                    .find()
                    .populate('client')
                    .populate('user', 'name email')
                    .skip(from)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .exec();
            }

            let response;

            if (sessions.length > 0) {
                response = {
                    ok: true,
                    data: sessions,
                    message: 'Get Sessions Ok!',
                };
            } else {
                response = {
                    ok: true,
                    data: [],
                    message: 'No hay sessions',
                };
            }
            return response;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getSessionById(id: MongooseSchema.Types.ObjectId) {
        try {
            const session = await (await this.sessionModel.findById(id).exec()).populate('client');

            return session;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
