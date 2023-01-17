import { ApiProperty } from "@nestjs/swagger";

export class CreateRepostDto{
  @ApiProperty({
    description: 'The Id of the origin post',
    example: 785291
  })
  originPostId: number;
}
