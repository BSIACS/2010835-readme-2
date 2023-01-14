import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { PostQuery } from "../blog-post/query/post.query";
import { SortByEnum } from "../blog-post/query/sort-by.enum";
import { SortDirectionEnum } from "../blog-post/query/sort-direction.enum";

const DEFAULT_SORT_DIRECTION = SortDirectionEnum.Desc;
const DEFAULT_SORT_BY_PARAM = SortByEnum.CreationDate;
const DEFAULT_POST_COUNT_LIMIT = 25;
const DEFAULT_PAGE_NUMBER = 1;


@Injectable()
export class ParsePostQueryPipe implements PipeTransform{

  async transform(value: PostQuery, { type }: ArgumentMetadata){
    value.limit = !value.limit ? DEFAULT_POST_COUNT_LIMIT : +value.limit;
    value.page = !value.page ? DEFAULT_PAGE_NUMBER : +value.page;
    value.sortBy = value.sortBy ?? DEFAULT_SORT_BY_PARAM;
    value.sortDirection = value.sortDirection ?? DEFAULT_SORT_DIRECTION;

    return value;
  }
}
