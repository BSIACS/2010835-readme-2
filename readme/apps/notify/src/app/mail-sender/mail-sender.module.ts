import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailSenderService } from './mail-sender.service';
import { MailSenderController } from './mail-sender.controller';
import { getMailSenderConfig } from '../config/mail-sender.config';

@Module({
  imports: [
    MailerModule.forRootAsync(getMailSenderConfig())
  ],
  providers: [
    MailSenderService
  ],
  exports: [
    MailSenderService
  ],
  controllers: [
    MailSenderController
  ]
})
export class MailSenderModule {}
