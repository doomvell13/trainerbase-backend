import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateClientDto } from '../users/dto/update-client.dto';

import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async create(createuserdto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createuserdto);
    return newUser.save();
  }

  async update(user: UpdateClientDto): Promise<User> {
    return await this.userModel.findOneAndUpdate(
      { _id: user.id },
      { isTrainer: user.isTrainer },
      {
        new: true,
      },
    );
  }
}
