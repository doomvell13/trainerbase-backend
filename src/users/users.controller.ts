import { Body, Controller, Get, Param, Put, Post, Patch } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateClientDto } from './dto/update-client.dto';

import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Post('/signup')
  createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.authService.signup(body.email, body.password);
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
