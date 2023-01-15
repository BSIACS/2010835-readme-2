import { Document } from 'mongoose';
import { SubscriberInterface } from '@readme/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

const SUBSCRIBERS_COLLECTION_NAME = 'email-subscribers';

@Schema({
  collection: SUBSCRIBERS_COLLECTION_NAME,
  timestamps: true,
})
export class MailSubscriberModel extends Document implements  SubscriberInterface {
  @Prop()
  public email: string;

  @Prop()
  public name: string;

  @Prop()
  public surname: string;

  @Prop()
  public userId: string;
}

export const MailSubscriberSchema = SchemaFactory.createForClass(MailSubscriberModel);
