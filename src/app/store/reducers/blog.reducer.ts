import {Action, createReducer, on} from '@ngrx/store';
import {IBlogState, initialBlogState} from '../state/blog.state';
import {
  addArticleError,
  addArticleSuccess,
  getArticlesResSuccess,
  getArticleSuccess
} from '../actions/blog.actions';
import {addTodoError, addTodoSuccess} from '../actions/todo.actions';

const _blogReducer = createReducer(
  initialBlogState,
  // on(getArticlesResSuccess, (state, { getArticlesRes }) => {
  //   const allArticles = [...state.getArticlesRes.articles, ...getArticlesRes.articles]
  //   return { ...state, getArticlesRes: {
  //       ...getArticlesRes,
  //       articles: allArticles
  //     }
  //   };
  // }),
  on(getArticlesResSuccess, (state, { articles, skipped, totalCount, hasNextPage }) => {
    return {
      ...state,
      articles: [...state.articles, ...articles],
      pagination: { limit: state.pagination.limit, skipped, totalCount, hasNextPage } };
  }),
  on(getArticleSuccess, (state, { article }) => {
    console.log(`Item ${ article._id }`);
    return { ...state, article };
  }),
  // on(addArticleSuccess, (state, { article }) => {
  //   return { state, articles: [...state.articles, article] }
  // }),
  on(addArticleError, (state, { article }) => {
    console.log(`ERROR!!! Failed to add item: ${ article.title }`);
    return { ...state, article }
  })
);

export function blogReducer(state: IBlogState | undefined, action: Action) {
  return _blogReducer(state, action);
}
