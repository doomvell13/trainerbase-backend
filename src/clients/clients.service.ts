import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientDocument, Client } from './client.schema';
import { User, UserDocument } from '../users/user.schema';
import { CreateClientDto, GetClientDto } from './dto/createClient.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getByEmail(email: string) {
    const client = await this.clientModel.findOne({ email }).populate({
      path: 'posts',
      populate: {
        path: 'categories',
      },
    });

    if (!client) {
      throw new NotFoundException();
    }

    return client;
  }

  async getById(id: string) {
    const client = await this.clientModel.findById(id).populate({
      path: 'trainer',
    });

    if (!client) {
      throw new NotFoundException();
    }

    return client;
  }

  async findAll() {
    return this.clientModel.find().populate('trainer');
  }

  async findOne(id: string) {
    const client = await this.clientModel.findById(id).lean();
    if (!client) {
      throw new NotFoundException();
    }
    const user =
      client.trainer && (await this.userModel.findById(client.trainer));
    // const client =
    //   session.clientId && (await this.clientModel.findById(session.clientId));

    return {
      ...client,
      // client,
      trainer: user,
    };
  }

  async update(id: string, clientData: GetClientDto) {
    const client = await this.clientModel
      .findByIdAndUpdate(id, clientData)
      .setOptions({ overwrite: true, new: true })
      .populate('trainer');

    if (!client) {
      throw new NotFoundException();
    }
    return client;
  }

  create(clientData: CreateClientDto, trainer: User): Promise<ClientDocument> {
    // console.log(sessionData);
    return this.clientModel.create({
      ...clientData,
      trainerId: trainer._id,
      // clientId: sessionData.clientId,
    });
  }
}
