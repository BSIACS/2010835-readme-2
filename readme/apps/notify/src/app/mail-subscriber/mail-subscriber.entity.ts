import { EntityInterface } from '@readme/core';
import { SubscriberInterface } from '@readme/shared-types';

export class MailSubscriberEntity implements EntityInterface<MailSubscriberEntity>, SubscriberInterface {
  public id: string;
  public email: string;
  public name: string;
  public surname: string;
  public userId: string;

  constructor(mailSubscriber: SubscriberInterface) {
    this.fillEntity(mailSubscriber);
  }

  public fillEntity(entity) {
    this.email = entity.email;
    this.userId = entity.userId;
    this.surname = entity.lastname;
    this.name = entity.firstname;
    this.id = entity.id ?? '';
  }

  public toObject(): MailSubscriberEntity {
    return { ...this };
  }
}
