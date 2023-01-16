import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { NOTIFY_SERVICE_ENV_PATH } from './app.constants';
import { mailSenderOptions } from './config/mail-sender.config';
import { getMongoDbConfig, mongoDbOptions } from './config/mongodb.config';
import { rabbitMqOptions } from './config/rabbitmq.config';
import { validateEnvironments } from './env.validation';
import { MailSenderModule } from './mail-sender/mail-sender.module';
import { MailSubscriberModule } from './mail-subscriber/mail-subscriber.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: NOTIFY_SERVICE_ENV_PATH,
      load: [mongoDbOptions, rabbitMqOptions, mailSenderOptions],
      validate: validateEnvironments,
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    MailSenderModule,
    MailSubscriberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
