import {createAction, props} from '@ngrx/store';
import {Article} from '../../interfaces/blog/article.interface';
import {GetArticlesRes} from '../../interfaces/blog/get-articles-res.interface';
import {CreateArticle} from '../../interfaces/blog/create-article.interface';
import {Pagination} from '../../interfaces/blog/pagination.interface';

export const getArticles = createAction(
  '[Articles] Get Articles',
  // props<{ skip: number, limit: number }>()
)

// export const getArticlesResSuccess = createAction(
//   '[GetArticlesRes] Get Articles Res Success',
//   props<{ getArticlesRes: GetArticlesRes }>()
// )

export const getArticlesResSuccess = createAction(
  '[GetArticlesRes] Get Articles Res Success',
  props<{ articles: Article[], skipped: number, totalCount: number, hasNextPage: boolean }>()
)

export const getArticle = createAction(
  '[Article] Get Article',
  props<{ id: string }>()
)

export const getArticleSuccess = createAction(
  '[Article] Get Article Success',
  props<{ article: Article }>()
)

export const addArticle = createAction(
  '[Article] Add Article',
  props<{ article: CreateArticle }>()
)

export const addArticleSuccess = createAction(
  '[Article] Add Article Success',
  props<{ article: Article }>()
)

export const addArticleError = createAction(
  '[Article] Add Article Error',
  props<{ article: Article }>()
)
