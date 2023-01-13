import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogUserController } from './blog-user.controller';
import { BlogUserModel, BlogUserSchema } from './blog-user.model';
import { BlogUserRepository } from './blog-user.repository';
import { BlogUserService } from './blog-user.service';
import { SubscriptionModel, SubscriptionSchema } from './subscriptions.model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: BlogUserModel.name, schema: BlogUserSchema },
    { name: SubscriptionModel.name, schema: SubscriptionSchema }
  ])],
  providers: [BlogUserRepository, BlogUserService],
  exports: [BlogUserRepository],
  controllers: [BlogUserController],
})
export class BlogUserModule {}
