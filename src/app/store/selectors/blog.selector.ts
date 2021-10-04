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
  selectBlogState,
  (state) => state.pagination.totalCount
)

export const selectHasNextPage = createSelector(
  selectBlogState,
  (state) => state.pagination.hasNextPage
)
