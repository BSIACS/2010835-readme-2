import { Document } from 'mongoose';
import { UserInterface,  } from '@readme/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'users',
})
export class BlogUserModel extends Document implements UserInterface {

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
  })
  public name: string;

  @Prop({
    required: true,
  })
  public surname: string;

  @Prop({
    required: true,
  })
  public passwordHash: string;

  @Prop()
  public avatar: string;

  @Prop({
    required: true,
  })
  public registerDate: Date;

  @Prop()
  postQuantity: number;

  @Prop()
  subscribersQuantity: number;

  @Prop()
  refreshToken: string;
}

export const BlogUserSchema = SchemaFactory.createForClass(BlogUserModel);
