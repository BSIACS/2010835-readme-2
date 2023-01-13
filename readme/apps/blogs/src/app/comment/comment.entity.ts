import { EntityInterface } from '@readme/core';
import { CommentInterface } from '@readme/shared-types';

export class CommentEntity implements EntityInterface<CommentEntity>, CommentInterface{
  public id : number;
  public text : string;
  public postId : number;
  public userId : string;
  public date : Date;


  constructor(comment: CommentInterface){
    this.fillEntity(comment);
  }

  public toObject(): CommentEntity {
    return {
      ...this,
    };
  }

  public fillEntity(entity: CommentInterface) {
    this.id = entity.id;
    this.text = entity.text;
    this.postId = entity.postId;
    this.userId = entity.userId;
    this.date = entity.date;
  }

}
