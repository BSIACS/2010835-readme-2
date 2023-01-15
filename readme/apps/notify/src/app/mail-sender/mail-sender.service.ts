import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SubscriberInterface } from '@readme/shared-types';

@Injectable()
export class MailSenderService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendNotification(subscriber : SubscriberInterface) {
    await this.mailerService.sendMail({
      to: `${subscriber.email}`,
      subject: 'Уведомление о регистрации',
      template: './new-subscriber-notification-email',
      context: {
        user: `${subscriber.name} ${subscriber.surname}` ,
        email: `${subscriber.email}`,
      }
    })
  }
}
