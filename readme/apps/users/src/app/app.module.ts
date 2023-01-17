import { Module } from '@nestjs/common';
import { BlogUserModule } from './blog-user/blog-user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ENV_FILE_PATH } from './app.constants';
import { databaseConfig } from '../config/database.config';
import envSchema from './env.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoDbConfig } from '../config/mongodb.config';
import { jwtConfig } from '../config/jwt.config';
import { rabbitMqOptions } from '../config/rabbitmq.config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [databaseConfig, jwtConfig, rabbitMqOptions],
      validationSchema: envSchema
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    BlogUserModule,
    AuthenticationModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get<string>('MULTER_DEST'),
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
