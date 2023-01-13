import { ApiProperty } from "@nestjs/swagger";
import { PostType } from "@readme/shared-types";
import { SortByEnum } from "./sort-by.enum";
import { SortDirectionEnum } from "./sort-direction.enum";

export class PostQuery {
  @ApiProperty({
    default: 25,
    required: false
  })
  limit?: number;

  @ApiProperty({
    default: 463781,
    required: false
  })
  userId?: string;

  @ApiProperty({
    enum: PostType,
    default: PostType.Video,
    required: false
  })
  postType?: PostType;

  @ApiProperty({
    default: '',
    required: false
  })
  postTag?: string;

  @ApiProperty({
    enum: SortByEnum,
    default: SortByEnum.CreationDate,
    required: false
  })
  sortBy: SortByEnum;

  @ApiProperty({
    enum: SortDirectionEnum,
    default: SortDirectionEnum.Desc,
    required: false
  })
  sortDirection?: SortDirectionEnum;

  @ApiProperty({
    default: 1,
    required: false
  })
  page?: number;
}
