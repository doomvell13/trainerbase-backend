import { Injectable } from '@nestjs/common';
import { UpdateClientDto } from './dto/update-client.dto';
import { CreateUserDto } from './dto/create-user.dto';

import { User } from './schemas/user.schema';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserById(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async createUser(createuserDto: CreateUserDto): Promise<User> {
    return await this.usersRepository.create(createuserDto);
  }

  async updateUser(updateclientDto: UpdateClientDto): Promise<User> {
    return this.usersRepository.update(updateclientDto);
  }
}
