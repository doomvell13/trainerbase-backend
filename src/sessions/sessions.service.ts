import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Session } from './interfaces/sessions.interface';
import { CreateSessionDTO } from './dto/create-session.dto';

@Injectable()
export class SessionsService {
  constructor(
    //what is readonly?

    @InjectModel('Session') private readonly sessionModel: Model<Session>,
  ) {}

  async addSession(createSessionDTO: CreateSessionDTO): Promise<Session> {
    const newSession = await this.sessionModel.create(createSessionDTO);
    return newSession;
  }

  async getSession(sessionID): Promise<Session> {
    const session = await this.sessionModel.findById(sessionID).exec();
    return session;
  }

  async getSessions(): Promise<Session[]> {
    const sessions = await this.sessionModel.find().exec();
    return sessions;
  }
}
