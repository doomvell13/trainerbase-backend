import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import CreateSessionDTO from './dto/create-session.dto';
import ValidatedID from './shared/pipes/validated-id.pipes';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionService: SessionsService) {}
  @Get()
  async getAllSessions() {
    return this.sessionService.findAll();
  }

  @Get(':session_id')
  async getSession(@Param() { session_id }: ValidatedID) {
    return this.sessionService.findOne(session_id);
  }

  @Post()
  async createSession(@Body() createSessionDto: CreateSessionDTO) {
    return this.sessionService.create(createSessionDto);
  }

  @Delete(':session_id')
  async deleteSession(@Param() { session_id }: ValidatedID) {
    return this.sessionService.delete(session_id);
  }

  @Put('session_id')
  async updateSession(
    @Param() { session_id }: ValidatedID,
    @Body() session: CreateSessionDTO,
  ) {
    return this.sessionService.update(session_id, session);
  }
}
