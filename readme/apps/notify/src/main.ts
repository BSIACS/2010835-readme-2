/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { getRabbitMqConfig } from './app/config/rabbitmq.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);
  app.connectMicroservice(getRabbitMqConfig(configService));

  await app.startAllMicroservices();
  Logger.log(`🚀 Notify service is running on`);

  app.useGlobalPipes(new ValidationPipe());

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3335;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
