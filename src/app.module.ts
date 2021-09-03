import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
// import { SessionsModule } from './sessions/sessions.module';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // ConfigModule.forRoot({
    //   validationSchema: Joi.object({
    //     MONGO_USERNAME: Joi.string().required(),
    //     MONGO_PASSWORD: Joi.string().required(),
    //     MONGO_DATABASE: Joi.string().required(),
    //     MONGO_PATH: Joi.string().required(),
    //   }),
    // }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get('MONGO_USERNAME');
        const password = configService.get('MONGO_PASSWORD');
        const database = configService.get('MONGO_DATABASE');
        const host = configService.get('MONGO_HOST');

        return {
          uri: configService.get('MONGO_URL'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
