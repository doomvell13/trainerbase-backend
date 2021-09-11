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
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';
// import RequestWithClient from '../authentication/requestWithClient.interface';
import MongooseClassSerializerInterceptor from '../utils/mongooseClassSerializer.interceptor';
import { Session as SessionModel } from './session.schema';
import { GetSessionDto, SessionDto } from './dto/session.dto';

@Controller('sessions')
@UseInterceptors(MongooseClassSerializerInterceptor(GetSessionDto))
export default class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get()
  async getAllSessions() {
    return this.sessionsService.findAll();
  }

  @Get(':id')
  async getSession(@Param() { id }: ParamsWithId) {
    const session = await this.sessionsService.findOne(id);
    return session;
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createSession(
    @Body() session: SessionDto,
    @Req() req: RequestWithUser,
  ) {
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
