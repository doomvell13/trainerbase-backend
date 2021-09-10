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
import SessionsService from './sessions.service';
import ParamsWithId from '../utils/paramsWithId';
import SessionDto from './dto/session.dto';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';
import MongooseClassSerializerInterceptor from '../utils/mongooseClassSerializer.interceptor';
import { Session as SessionModel } from './session.schema';

@Controller('sessions')
@UseInterceptors(MongooseClassSerializerInterceptor(SessionModel))
export default class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get()
  async getAllSessions() {
    return this.sessionsService.findAll();
  }

  @Get(':id')
  async getSession(@Param() { id }: ParamsWithId) {
    return this.sessionsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createSession(
    @Body() session: SessionDto,
    @Req() req: RequestWithUser,
  ) {
    console.log(req.user);
    return this.sessionsService.create(session, req.user);
  }

  @Delete(':id')
  async deleteSession(@Param() { id }: ParamsWithId) {
    return this.sessionsService.delete(id);
  }

  @Put(':id')
  async updateSession(
    @Param() { id }: ParamsWithId,
    @Body() session: SessionDto,
  ) {
    return this.sessionsService.update(id, session);
  }
}
