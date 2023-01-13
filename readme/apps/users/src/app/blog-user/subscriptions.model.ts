import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'subscriptions',
})
export class SubscriptionModel extends Document{
  @Prop({
    required: true,
  })
  public publisherId: string;

  @Prop({
    required: true,
  })
  public subscriberId: string;
}

export const SubscriptionSchema = SchemaFactory.createForClass(SubscriptionModel);
