import { CommentInterface } from "./comment.interface";

export interface PostInterface{
  id?: number;
  originPostId?: number;
  userId?: string;
  originUserId?: string;
  creationDate?: Date;
  publishDate?: Date;
  postType?: string;
  postState?: string;
  isRepost?: boolean;
  likeCount?: number;
  likeUsers?: string[];
  name?: string;                  //video, text
  videoLink?: string;             //video,
  announceText?: string;          //text,
  text?: string;                  //text, quote, link
  author?: string;                //quote
  photo?: string;                 //photo
  link?: string;                  //link
  tags?: string[];                //video, photo, text, quote, link
  comments?: CommentInterface[];
  commentsCount?: number;
  isSent?: boolean;
}
