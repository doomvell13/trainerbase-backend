import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import RegisterDto from './dto/register.dto';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { User } from '../users/user.schema';
import { Client } from '../clients/client.schema';
import MongooseClassSerializerInterceptor from '../utils/mongooseClassSerializer.interceptor';
import { response } from 'express';

@Controller('authentication')
@UseInterceptors(MongooseClassSerializerInterceptor(User))
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }
  @Post('registerclient')
  async registerClient(@Body() registrationData: RegisterDto) {
    return this.authenticationService.registerClient(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const cookie = this.authenticationService.getCookieWithJwtToken(user._id);
    request.res?.setHeader('Set-Cookie', cookie);
    JSON.stringify(user);
    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  @HttpCode(200)
  async logOut(@Req() request: RequestWithUser) {
    request.res?.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForLogOut(),
    );
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    return request.user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('/current-user')
  getAuthenticatedUser(@Req() request: RequestWithUser) {
    return request.user;
  }
}
