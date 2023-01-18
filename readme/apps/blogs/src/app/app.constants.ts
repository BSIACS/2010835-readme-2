import { SortByEnum } from "./blog-post/query/sort-by.enum";
import { SortDirectionEnum } from "./blog-post/query/sort-direction.enum";

export const ENV_FILE_PATH = 'environments/.blogs.env';

export const DEFAULT_SORT_DIRECTION = SortDirectionEnum.Desc;
export const DEFAULT_SORT_BY_PARAM = SortByEnum.CreationDate;
export const DEFAULT_POST_COUNT_LIMIT = 25;
export const DEFAULT_PAGE_NUMBER = 1;
