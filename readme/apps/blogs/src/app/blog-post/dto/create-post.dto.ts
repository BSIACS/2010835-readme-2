import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto{
  @ApiProperty({
    description: 'The Id of the origin post (if repost)',
    example: 785291
  })
  originPostId: number;

  @ApiProperty({
    description: 'Post creator Id',
    example: '456371'
  })
  userId: string;

  @ApiProperty({
    description: 'The Id of the origin post (if repost)',
    example: '456371'
  })
  originUserId: string;

  publishDate: Date;

  @ApiProperty({
    description: 'Post type',
    example: 'video'
  })
  postType: string;

  @ApiProperty({
    description: 'Post state',
    example: 'draft'
  })
  postState: string;

  @ApiProperty({
    description: 'Repost flag',
    example: true
  })
  isRepost: boolean;

  @ApiProperty({
    description: 'Post name',
    example: '456371'
  })
  name?: string;                  //video, text

  @ApiProperty({
    description: 'Video link source',
    example: 'www.somehosting.com/somevideosource'
  })
  videoLink?: string;             //video,

  @ApiProperty({
    description: 'Post anounce text',
    example: '456371'
  })
  announceText?: string;          //text,

  @ApiProperty({
    description: 'Post text content',
  })
  text?: string;                  //text, quote, link

  @ApiProperty({
    description: 'Post author',
    example: 'Jane Doe'
  })
  author?: string;                //quote

  @ApiProperty({
    description: 'Photo link source',
    example: 'www.somehosting.com/someimagesource'
  })
  photo?: string;                 //photo

  @ApiProperty({
    description: 'Resource http link',
    example: 'www.somehosting.com/somevideosource'
  })
  link?: string;                  //link

  @ApiProperty({
    description: 'Post tags',
    example: ['sport', 'fashion', 'electronic']
  })
  tags: string[];
}
