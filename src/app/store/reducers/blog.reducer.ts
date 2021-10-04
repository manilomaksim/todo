import { Action, createReducer, on } from '@ngrx/store';
import { IBlogState, initialBlogState } from '../state/blog.state';
import {
  addArticleError, addArticleSuccess,
  getArticlesResSuccess,
  getArticleSuccess
} from '../actions/blog.actions';

const _blogReducer = createReducer(
  initialBlogState,
  on(getArticlesResSuccess, (state, { articles, totalCount, hasNextPage }) => {
    return {
      ...state,
      articles: [...state.articles, ...articles],
      pagination: { skip: state.pagination.skip + state.pagination.limit, totalCount, limit: state.pagination.limit, hasNextPage } };
  }),
  on(getArticleSuccess, (state, { article }) => {
    return { ...state, article };
  }),
  on(addArticleSuccess, (state, { article }) => {
    return { ...state, articles: [...state.articles, article] }
  }),
  on(addArticleError, (state, { article }) => {
    console.log(`ERROR!!! Failed to add item: ${ article.title }`);
    return { ...state, article }
  })
);

export function blogReducer(state: IBlogState | undefined, action: Action) {
  return _blogReducer(state, action);
}
