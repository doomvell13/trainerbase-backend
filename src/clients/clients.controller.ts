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
// import RequestWithClient from '../authentication/requestWithClient.interface';
import MongooseClassSerializerInterceptor from '../utils/mongooseClassSerializer.interceptor';
import { CreateClientDto, GetClientDto } from './dto/createClient.dto';

@Controller('clients')
@UseInterceptors(MongooseClassSerializerInterceptor(GetClientDto))
export default class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  async getAllClients() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  async getClient(@Param() { id }: ParamsWithId) {
    const client = await this.clientsService.findOne(id);
    return client;
  }

  @Post('register')
  @UseGuards(JwtAuthenticationGuard)
  async createClient(
    @Body() session: CreateClientDto,
    @Req() req: RequestWithUser,
  ) {
    return this.clientsService.create(session, req.user);
  }

  @Put(':id')
  async updateClient(
    @Param() { id }: ParamsWithId,
    @Body() client: GetClientDto,
  ) {
    return this.clientsService.update(id, client);
  }
}
