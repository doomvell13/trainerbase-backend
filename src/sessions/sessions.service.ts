import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import CreateSessionDTO from './dto/create-session.dto';
import { Session, SessionDocument } from './schemas/sessions.schema';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<SessionDocument>,
  ) {}

  async findAll() {
    return this.sessionModel.find();
  }

  async findOne(session_id: string) {
    const session = await this.sessionModel.findById(session_id);
    if (!session) {
      throw new NotFoundException();
    }
    return session;
  }

  create(sessionData: CreateSessionDTO) {
    const createdSession = new this.sessionModel(sessionData);
    return createdSession.save();
  }

  async update(session_id: string, sessionData: CreateSessionDTO) {
    const session = await this.sessionModel
      .findByIdAndUpdate(session_id, sessionData)
      .setOptions({ overwrite: true, new: true });
    if (!session) {
      throw new NotFoundException();
    }
    return session;
  }

  async delete(session_id: string) {
    const result = await this.sessionModel.findByIdAndDelete(session_id);
    if (!result) {
      throw new NotFoundException();
    }
  }
}
