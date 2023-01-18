import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { CommandEvent } from "@readme/shared-types";
import { NewPostNotificationInterface } from '@readme/shared-types';
import { CreateSubscriberDto } from "./dto/create-subscriber.dto";
import { MailSubscriberService } from "./mail-subscriber.service";

@Controller()
export class MailSubscriberController {
  constructor(
    private readonly subscriberService: MailSubscriberService,
  ) {}

  @EventPattern({ cmd: CommandEvent.AddSubscriber})
  public async create(subscriber: CreateSubscriberDto) {

    return this.subscriberService.addSubscriber(subscriber);
  }

  @EventPattern({ cmd: CommandEvent.SendNewPosts})
  public async notifyNewPosts(payload: { posts : NewPostNotificationInterface[]}) {

    return this.subscriberService.notifyNewPosts(payload.posts);
  }
}
