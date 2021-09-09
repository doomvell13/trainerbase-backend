import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';

import { GetQueryDto } from '../../dto/getQueryDto';
import { CreateSessionDto } from './dto/createSession.dto';
import { UpdateSessionDto } from './dto/updateSession.dto';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
    constructor(private sessionService: SessionService) {}

    @Post('/createSession')
    async createSession(@Body() createSessionDto: CreateSessionDto, @Res() res: any) {
        const newSession: any = await this.sessionService.createSession(createSessionDto);
        return res.status(HttpStatus.OK).send(newSession);
    }

    @Put('/updateSession/:id')
    async updateSession(
        @Param('id') id: MongooseSchema.Types.ObjectId,
        @Body() updateSessionDto: UpdateSessionDto,
        @Res() res: any,
    ) {
        const newSession: any = await this.sessionService.updateSession(updateSessionDto);
        return res.status(HttpStatus.OK).send(newSession);
    }

    @Get('/getSessionById/:id')
    async getSessionById(@Param('id') id: MongooseSchema.Types.ObjectId, @Res() res: any) {
        const storage: any = await this.sessionService.getSessionById(id);

        return res.status(HttpStatus.OK).send(storage);
    }

    @Get('/getSessions')
    async getAllSessions(@Query() getQueryDto: GetQueryDto, @Res() res: any) {
        const storages: any = await this.sessionService.getSessions(getQueryDto);
        return res.status(HttpStatus.OK).send(storages);
    }
}
