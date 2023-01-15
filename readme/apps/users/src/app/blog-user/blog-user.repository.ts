import { CRUDRepositoryInterface } from '@readme/core';
import { UserInterface } from '@readme/shared-types';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { Injectable } from '@nestjs/common';
import { BlogUserModel } from './blog-user.model';
import mongoose, { Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { SubscriptionModel } from './subscriptions.model';

@Injectable()
export class BlogUserRepository implements CRUDRepositoryInterface<BlogUserEntity, string, UserInterface> {

  constructor(
    @InjectModel(BlogUserModel.name) private readonly blogUserModel: Model<BlogUserModel>,
    @InjectModel(SubscriptionModel.name) private readonly subscriptionModel: Model<SubscriptionModel>,
    @InjectConnection() private readonly connection: mongoose.Connection,) {
  }

  public async findById(id: string): Promise<UserInterface | null> {
    return this.blogUserModel
      .findOne({_id: id})
      .exec();
  }

  public async findByEmail(email: string): Promise<UserInterface | null> {
    return this.blogUserModel
      .findOne({email})
      .exec();
  }


  public async create(item: BlogUserEntity): Promise<UserInterface> {
    const newBlogUser = new this.blogUserModel(item);

    return newBlogUser.save();
  }

  public async update(id: string, item: BlogUserEntity): Promise<UserInterface> {
    return this.blogUserModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }

  public async findPublisherSubscriberDocument(subscriberId : string, publisherId : string){

    return this.subscriptionModel.findOne({publisherId: publisherId, subscriberId: subscriberId, });
  }

  public async createSubscription(subscriberId : string, publisherId : string){
    const newSubscription = new this.subscriptionModel({publisherId: publisherId, subscriberId: subscriberId, });

    return newSubscription.save();
  }

  public async deleteSubscription(subscriberId : string, publisherId : string){
    return this.subscriptionModel
      .deleteOne({publisherId: publisherId, subscriberId: subscriberId})
      .exec();
  }

  public async getSubscribersIds(userId : string){
    return this.subscriptionModel
      .find({publisherId: userId}, {subscriberId: 1, _id: 0 })
      .exec();
  }

  public async getPublisherIds(userId : string){
    return this.subscriptionModel
      .find({subscriberId: userId}, {publisherId: 1, _id: 0 })
      .exec();
  }

  public async destroy(id: string): Promise<void> {
    this.blogUserModel.deleteOne({id});
  }

  public async updateRefreshToken(userId : string, refreshToken : string) : Promise<UserInterface>{
    return this.blogUserModel
      .findByIdAndUpdate(userId, {refreshToken: refreshToken}, {new: true})
      .exec();
  }

  public async clearRefreshToken(userId : string) : Promise<UserInterface>{
    return this.blogUserModel
      .findByIdAndUpdate(userId, {refreshToken: ''}, {new: true})
      .exec();
  }
}
