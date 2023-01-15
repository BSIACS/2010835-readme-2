import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { getJwtConfig } from '../../config/jwt.config';
import { getRabbitMqConfig } from '../../config/rabbitmq.config';
import { BlogUserModule } from '../blog-user/blog-user.module';
import { RABBITMQ_SERVICE } from './authentication.constants';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy],
  imports: [
    BlogUserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    }),
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE,
        useFactory: getRabbitMqConfig,
        inject: [ConfigService]
      }
    ]),
  ],
})
export class AuthenticationModule {}
