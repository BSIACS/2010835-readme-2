import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailSenderService } from './mail-sender.service';
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
  controllers: []
})
export class MailSenderModule {}
