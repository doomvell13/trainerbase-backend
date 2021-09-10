import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Session, SessionDocument } from './session.schema';
import { NotFoundException } from '@nestjs/common';
import SessionDto from './dto/session.dto';
import { User } from '../users/user.schema';
import { Client } from '../clients/client.schema';

@Injectable()
class SessionsService {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<SessionDocument>,
  ) {}

  async findAll() {
    return this.sessionModel.find().populate('trainer').populate('categories');
  }

  async findOne(id: string) {
    const session = await this.sessionModel
      .findById(id)
      .populate('trainer')
      .populate('categories');
    if (!session) {
      throw new NotFoundException();
    }
    return session;
  }

  async create(sessionData: SessionDto, trainer: User) {
    const createdSession = new this.sessionModel({
      ...sessionData,
      trainer,
    });
    await createdSession
      .populate('client')
      .populate('categories')
      .execPopulate();

    return createdSession.save();
  }

  async update(id: string, sessionData: SessionDto) {
    const session = await this.sessionModel
      .findByIdAndUpdate(id, sessionData)
      .setOptions({ overwrite: true, new: true })
      .populate('trainer')
      .populate('categories');
    if (!session) {
      throw new NotFoundException();
    }
    return session;
  }

  async delete(sessionId: string) {
    const result = await this.sessionModel.findByIdAndDelete(sessionId);
    if (!result) {
      throw new NotFoundException();
    }
  }
}

export default SessionsService;
