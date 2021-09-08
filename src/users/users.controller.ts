import { Body, Controller, Get, Param, Put, Post, Patch } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateClientDto } from './dto/update-client.dto';

import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Patch(':id/isTrainer')
  updateUser(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<User> {
    updateClientDto.id = id;
    return this.usersService.updateUser(updateClientDto);
  }
}
