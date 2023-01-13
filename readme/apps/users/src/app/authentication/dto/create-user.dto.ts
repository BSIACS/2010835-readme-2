import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto{
  @ApiProperty({
    description: 'The unique email of user',
    example: 'user@notfound1.com'
  })
  public email: string;

  @ApiProperty({
    description: 'Name of user',
    example: 'Jack'
  })
  public name: string;

  @ApiProperty({
    description: 'Surname of user',
    example: 'Nicholson'
  })
  public surname: string;

  @ApiProperty({
    description: 'User password',
    example: '424242'
  })
  public password: string;
}
