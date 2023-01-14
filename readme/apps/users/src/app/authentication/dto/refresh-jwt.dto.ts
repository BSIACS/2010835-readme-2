import { ApiProperty } from "@nestjs/swagger";

export class RefreshJwtDto{
  @ApiProperty({
    description: 'User Id',
    example: '63c1c6e9b6d8793ee5bca709'
  })
  public userId: string;

  @ApiProperty({
    description: 'Actual refresh token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2M2MxYzZlOWI2ZDg3OTNlZTViY2E3MDkiLCJpYXQiOjE2NzM2NDQ3MDIsImV4cCI6MTY3MzY0NTAwMn0.mZ6YE4LAzFQPxorBYHyrcOKi7ybtz7uWdfxhhYrtyYI'
  })
  public refreshToken: string;
}
