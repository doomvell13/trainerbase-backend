import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import ParamsWithId from '../utils/paramsWithId';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';

import MongooseClassSerializerInterceptor from '../utils/mongooseClassSerializer.interceptor';
// import { GetSessionDto, SessionDto } from './dto/session.dto';
import CreateClientDto from './dto/createClient.dto';
import { GetClientDto } from './dto/getClient.dto';

@Controller('clients')
@UseInterceptors(MongooseClassSerializerInterceptor(GetClientDto))
export default class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  //   @Get()
  //   async getAllSessions() {
  //     return this.clientsService.findAll();
  //   }

  //   @Get(':id')
  //   async getSession(@Param() { id }: ParamsWithId) {
  //     const session = await this.clientsService.findOne(id);
  //     return session;
  //   }

  @Post('register')
  @UseGuards(JwtAuthenticationGuard)
  async createSession(
    @Body() session: CreateClientDto,
    @Req() req: RequestWithUser,
  ) {
    return this.clientsService.create(session, req.user);
  }

  //   @Delete(':id')
  //   async deleteSession(@Param() { id }: ParamsWithId) {
  //     return this.clientsService.delete(id);
  //   }

  //   @Put(':id')
  //   async updateSession(
  //     @Param() { id }: ParamsWithId,
  //     @Body() session: SessionDto,
  //   ) {
  //     return this.clientsService.update(id, session);
  //   }
}
