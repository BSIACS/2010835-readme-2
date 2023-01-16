import { CRUDRepositoryInterface } from '@readme/core';
import { MailSubscriberEntity } from './mail-subscriber.entity';
import { SubscriberInterface } from '@readme/shared-types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailSubscriberModel } from './mail-subscriber.model';

@Injectable()
export class MailSubscriberRepository implements CRUDRepositoryInterface<MailSubscriberEntity, string, SubscriberInterface> {
  constructor(
    @InjectModel(MailSubscriberModel.name) private readonly mailSubscriberModel: Model<MailSubscriberModel>
  ) {}

  public async create(item: MailSubscriberEntity): Promise<SubscriberInterface> {
    const newMailSubscriber = new this.mailSubscriberModel(item);
    return newMailSubscriber.save();
  }

  public async destroy(id: string): Promise<void> {
    this.mailSubscriberModel.deleteOne({ id });
  }

  public async findById(id: string): Promise<SubscriberInterface | null> {
    return this.mailSubscriberModel
        .findOne({ id })
        .exec();
  }

  public async getAll() : Promise<SubscriberInterface[] | null>{
    return this.mailSubscriberModel.find();
  }

  public async update(id: string, item: MailSubscriberEntity): Promise<SubscriberInterface> {
    return this.mailSubscriberModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }

  public async findByEmail(email: string): Promise<SubscriberInterface | null> {
    return this.mailSubscriberModel
      .findOne({ email })
      .exec()
  }


}
