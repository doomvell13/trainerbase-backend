import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Session, SessionDocument } from './session.schema';
import { NotFoundException } from '@nestjs/common';
import { SessionDto } from './dto/session.dto';
import { User, UserDocument } from '../users/user.schema';
import { Client, ClientDocument } from '../clients/client.schema';

@Injectable()
class SessionsService {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<SessionDocument>,
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findAll() {
    return this.sessionModel.find().populate('trainer').populate('categories');
  }

  async findOne(id: string) {
    const session = await this.sessionModel.findById(id).lean();
    if (!session) {
      throw new NotFoundException();
    }
    const user =
      session.trainerId && (await this.userModel.findById(session.trainerId));
    const client =
      session.clientId && (await this.clientModel.findById(session.clientId));

    return {
      ...session,
      client,
      trainer: user,
    };
  }

  create(sessionData: SessionDto, trainer: User): Promise<SessionDocument> {
    return this.sessionModel.create({
      content: sessionData.content,
      trainerId: trainer._id,
      clientId: sessionData.clientId,
    });
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
