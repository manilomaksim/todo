import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';

export const selectBlogState = (state: IAppState) => state.getArticleRes;

export const selectArticles = createSelector(
  selectBlogState,
  (state) => state.articles
);

export const selectArticle = createSelector(
  selectBlogState,
  (state) => state.article
);

export const selectArticlesPagination = createSelector(
  selectBlogState,
  (state) => state.pagination
);

export const selectTotalCount = createSelector(
  selectArticlesPagination,
  (state) => state.totalCount
)

export const selectHasNextPage = createSelector(
  selectArticlesPagination,
  (state) => state.hasNextPage
)
