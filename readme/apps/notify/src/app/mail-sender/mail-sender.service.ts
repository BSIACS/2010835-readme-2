import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { NewPostNotificationInterface, SubscriberInterface } from '@readme/shared-types';
import { parseNewPostTextContent } from '@readme/core';

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

  public async sendNewPostsNotification(posts : NewPostNotificationInterface[], subscribers : SubscriberInterface[]) {
    subscribers.forEach(async (subscriber) => {
      await this.mailerService.sendMail({
        to: `${subscriber}`,
        subject: 'Новые публикации',
        template: './new-posts-noification-email',
        context: {
          title: `Новые публикации`,
          publisherName: `Mr. Bronski`,
          posts: posts.map((post) => parseNewPostTextContent(post)),
        }
      })
    })
  }
}
