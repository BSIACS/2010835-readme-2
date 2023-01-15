import { Module } from '@nestjs/common';
import { MailSubscriberController } from './mail-subscriber.controller';
import { MailSubscriberService } from './mail-subscriber.service';
import { MailSubscriberRepository } from './mail-subscriber.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { MailSubscriberModel, MailSubscriberSchema } from './mail-subscriber.model';
import { MailSenderService } from '../mail-sender/mail-sender.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MailSubscriberModel.name, schema: MailSubscriberSchema }
    ])
  ],
  controllers: [
    MailSubscriberController
  ],
  providers: [
    MailSubscriberService,
    MailSubscriberRepository,
    MailSenderService
  ],
})
export class MailSubscriberModule {}
