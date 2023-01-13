import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class CreateCommentRdo{
  @ApiProperty({
    description: 'Comment id',
    example: 11,
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'Comment text content',
  })
  @Expose()
  text: string;

  @ApiProperty({
    description: 'The Id of the post the comment is associated with',
    example: '456371'
  })
  @Expose()
  postId: number;

  @ApiProperty({
    description: 'Comment creation date',
    example: '2023-01-10T11:55:26.713Z',
  })
  @Expose()
  date: string;

  @ApiProperty({
    description: 'The Id of the publisher the comment is associated with',
    example: '63adb49109dcc7cd2c2b44ab'
  })
  @Expose()
  userId: string;
}

