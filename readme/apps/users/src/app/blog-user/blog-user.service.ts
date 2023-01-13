import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { BlogUserRepository } from "./blog-user.repository";

@Injectable()
export class BlogUserService{
  constructor(
    private readonly repository : BlogUserRepository
  ){}

  public async createSubscription(subscriberId : string, publisherId : string){
    const existedDocument = await this.repository.findPublisherSubscriberDocument(subscriberId, publisherId)

    if(existedDocument){
      throw new ConflictException(`Subscription already exist. Details: publisher id - ${publisherId}; subscriber id - ${subscriberId}.`);
    }

    return this.repository.createSubscription(subscriberId, publisherId);
  }

  public async cancelSubscription(subscriberId : string, publisherId : string){
    const existedDocument = await this.repository.findPublisherSubscriberDocument(subscriberId, publisherId)

    if(!existedDocument){
      throw new NotFoundException(`Subscription not found. Details: publisher id - ${publisherId}; subscriber id - ${subscriberId}.`);
    }

    return this.repository.deleteSubscription(subscriberId, publisherId);
  }

  public async getSubscribers(userId : string){
    const subscribers = await this.repository.getSubscribersIds(userId);

    return subscribers.map((queryResult) => queryResult.subscriberId);
  }

  public async getSubscriptions(userId : string){
    const subscribers = await this.repository.getPublisherIds(userId);

    return subscribers.map((queryResult) => queryResult.publisherId);
  }
}
