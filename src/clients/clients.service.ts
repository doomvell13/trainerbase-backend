import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientDocument, Client } from './client.schema';
import { User, UserDocument } from '../users/user.schema';
import CreateClientDto from './dto/createClient.dto';
import { ObjectUnsubscribedError } from 'rxjs';

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

  async create(
    clientData: CreateClientDto,
    trainer: User,
  ): Promise<ClientDocument> {
    // console.log({
    //   ...clientData,
    //   trainerId: ,
    // });
    return this.clientModel.create({
      ...clientData,
      trainerId: trainer._id,
    });
    // const createdClient = new this.clientModel(clientData);
    // await createdClient
    //   .populate({
    //     path: 'trainer',
    //   })
    //   .execPopulate();
    // return createdClient.save();
  }
}
