import { ApiProperty } from "@nestjs/swagger";

export class SubscribeDto{
  @ApiProperty({
    description: 'The unique email of user',
    example: 'user@notfound1.com'
  })
  public id: string;

}
