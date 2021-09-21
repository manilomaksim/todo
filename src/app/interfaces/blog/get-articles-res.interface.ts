import {Article} from './article.interface';

export interface GetArticlesRes {
  success: boolean,
  hasNextPage: boolean,
  totalCount: number,
  skipped: number,
  articles: Article[]
}
