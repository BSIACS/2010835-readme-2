import { Injectable, PipeTransform } from "@nestjs/common";
import { DEFAULT_PAGE_NUMBER, DEFAULT_POST_COUNT_LIMIT, DEFAULT_SORT_BY_PARAM, DEFAULT_SORT_DIRECTION } from "../app.constants";
import { PostQuery } from "../blog-post/query/post.query";


@Injectable()
export class ParsePostQueryPipe implements PipeTransform{

  async transform(value: PostQuery,){
    value.limit = !value.limit ? DEFAULT_POST_COUNT_LIMIT : +value.limit;
    value.page = !value.page ? DEFAULT_PAGE_NUMBER : +value.page;
    value.sortBy = value.sortBy ?? DEFAULT_SORT_BY_PARAM;
    value.sortDirection = value.sortDirection ?? DEFAULT_SORT_DIRECTION;

    return value;
  }
}
