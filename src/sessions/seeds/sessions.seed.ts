import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';

import { SessionsService } from '../sessions.service';

@Injectable()
export class SessionsSeed {
  constructor(private readonly sessionsService: SessionsService) {}

  @Command({
    command: 'create:user',
    describe: 'create a user',
    autoExit: true,
  })
  async create() {
    const user = await this.userService.create({
      firstName: 'First name',
      lastName: 'Last name',
      mobile: 999999999,
      email: 'test@test.com',
      password: 'foo_b@r',
    });
    console.log(user);
  }
}
