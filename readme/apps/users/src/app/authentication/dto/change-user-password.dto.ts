import { ApiProperty } from "@nestjs/swagger";

export class ChangeUserPasswordDto{
  @ApiProperty({
    description: 'Old user password',
  })
  public oldPassword: string;

  @ApiProperty({
    description: 'New user password',
  })
  public newPassword: string;
}
