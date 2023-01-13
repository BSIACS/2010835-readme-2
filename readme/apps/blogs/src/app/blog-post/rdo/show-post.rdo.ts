import { Expose } from "class-transformer";

export class ShowPostRdo {
  public id : number;

  @Expose()
  public originPostId? : number;

  @Expose()
  public userId : string;

  @Expose()
  public originUserId? : string;

  @Expose()
  public creationDate : string;

  @Expose()
  public publishDate : string;

  @Expose()
  public postType : string;

  @Expose()
  public postState : string;

  @Expose()
  public isRepost : boolean;

  @Expose()
  public name? : string;

  @Expose()
  public videoLink? : string;

  @Expose()
  public announceText? : string;

  @Expose()
  public text? : string;

  @Expose()
  public author? : string;

  @Expose()
  public photo? : string;

  @Expose()
  public link? : string;

  @Expose()
  public tags : string[];

  @Expose()
  public commentsCount : number;

  @Expose()
  public comments : Comment[];
}
