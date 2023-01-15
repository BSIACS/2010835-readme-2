import { Injectable } from '@nestjs/common';
import { MailSubscriberRepository } from './mail-subscriber.repository';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EMAIL_SUBSCRIBER_EXISTS } from './mail-subscriber.constants';
import { MailSubscriberEntity } from './mail-subscriber.entity';
import { MailSenderService } from '../mail-sender/mail-sender.service';

@Injectable()
export class MailSubscriberService {
  constructor(
    private readonly mailSubscriberRepository: MailSubscriberRepository,
    private readonly mailSenderService: MailSenderService
  ) {}

  public async addSubscriber(subscriber: CreateSubscriberDto) {
    const { email } = subscriber;
    const existsSubscriber = await this.mailSubscriberRepository.findByEmail(email);

    if (existsSubscriber) {
      throw new Error(EMAIL_SUBSCRIBER_EXISTS);
    }

    this.mailSenderService.sendNotification(subscriber);

    return this.mailSubscriberRepository
      .create(new MailSubscriberEntity(subscriber));
  }
}
