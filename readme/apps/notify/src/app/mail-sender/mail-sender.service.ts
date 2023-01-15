import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailSenderService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendNotifications() {
    await this.mailerService.sendMail({
      to: 'johnnyrocket@fakemail.ru',
      subject: 'Это тестовое письмо!',
      template: './test-mail',
      context: {
        user: `John Doe`,
        email: `admin@local.com`,
      }
    })
  }
}
