import { ApiProperty } from "@nestjs/swagger";

export class RefreshJwtRdo{
  @ApiProperty({
    description: 'New access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2M2MxYzZlOWI2ZDg3OTNlZTViY2E3MDkiLCJpYXQiOjE2NzM2NDQ3MDIsImV4cCI6MTY3MzY0NTAwMn0.mZ6YE4LAzFQPxorBYHyrcOKi7ybtz7uWdfxhhYrtyYI'
  })
  public accessToken: string;

  @ApiProperty({
    description: 'New refresh token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2M2MxYzZlOWI2ZDg3OTNlZTViY2E3MDkiLCJpYXQiOjE2NzM2NDQ3MDIsImV4cCI6MTY3MzY0NTAwMn0.mZ6YE4LAzFQPxorBYHyrcOKi7ybtz7uWdfxhhYrtyYI'
  })
  public refreshToken: string;
}
