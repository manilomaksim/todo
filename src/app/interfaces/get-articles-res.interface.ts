import {Article} from './article.interface';

export interface GetArticlesRes {
  success: boolean,
  articles: Article[]
}
