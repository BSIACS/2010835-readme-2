import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto{
  @ApiProperty({
    description: 'Comment text content',
  })
  text: string;

  @ApiProperty({
    description: 'The Id of the post the comment is associated with',
    example: '456371'
  })
  postId: number;

  @ApiProperty({
    description: 'The Id of the publisher the comment is associated with',
    example: '63adb49109dcc7cd2c2b44ab'
  })
  userId: string;
}

