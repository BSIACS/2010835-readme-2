import { plainToInstance, ClassConstructor } from 'class-transformer';
import { PostInterface } from '../../../shared-types/src/lib/post.interface';
import { NewPostNotificationInterface } from '../../../shared-types/src/lib/new-posts-notification.interface';
import { PostType } from '../../../shared-types/src/lib/postType.enum';

export function fillObject<T1, T2>(dto: ClassConstructor<T1>, plainObject: T2): T1{
  return plainToInstance(dto, plainObject, {excludeExtraneousValues: true});
}

export function getMongoConnectionString({username, password, host, port, databaseName, authDatabase}): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export function parseNewPostNotification(post : PostInterface) : NewPostNotificationInterface{
  const publisherId : string = post.userId;
  const postId : number = post.id;
  const postType : string = post.postType;
  let postHeader : string;

  switch(postType){
    case PostType.Text:
      postHeader = post.name;
      break;
    case PostType.Video:
      postHeader = post.name;
      break;
  }

  const result = {
    publisherId,
    postId,
    postType,
    postHeader,
  } as NewPostNotificationInterface;

  return result;
}

export function parseNewPostTextContent(newPostNotification : NewPostNotificationInterface) : string{

  switch(newPostNotification.postType){
    case PostType.Link:
      return `Пользователь id:${newPostNotification.publisherId} опубликовал ссылку`;
    case PostType.Photo:
      return `Пользователь id:${newPostNotification.publisherId} опубликовал изображение`;
    case PostType.Quote:
      return `Пользователь id:${newPostNotification.publisherId} опубликовал цитату`;
    case PostType.Text:
      return `Пользователь id:${newPostNotification.publisherId} опубликовал пост "${newPostNotification.postHeader}".`;
    case PostType.Video:
      return `Пользователь id:${newPostNotification.publisherId} опубликовал видео "${newPostNotification.postHeader}".`;
  }
}
