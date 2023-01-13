import { Expose, Transform } from "class-transformer";
import {ApiProperty} from '@nestjs/swagger';

export class ShowUserRdo{

  @ApiProperty({
    description: 'The unique user ID',
    example: '63a3892e82238a9bdc02642c'
  })
  @Expose()
  @Transform(params => params.obj._id)
  public _id;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.local'
  })
  @Expose()
  public email;

  @ApiProperty({
    description: 'Name of user',
    required: true,
    example: 'Jack'
  })
  @Expose()
  public name;

  @ApiProperty({
    description: 'Surname of user',
    required: true,
    example: 'Nicholson'
  })
  @Expose()
  public surname;

  @Expose()
  public avatar;

  @ApiProperty({
    description: 'User registration date',
    required: true,
    example: '2022-12-01T20:22:32.847Z'
  })
  @Expose()
  public registerDate;
}
