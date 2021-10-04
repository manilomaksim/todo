import {createSelector} from '@ngrx/store';
import {IAppState} from '../state/app.state';

export const selectBlogState = (state: IAppState) => state.getArticleRes;

export const selectArticles = createSelector(
  selectBlogState,
  (state) => state.articles
);

export const selectPagination = createSelector(
  selectBlogState,
  (state) => state.pagination
);

export const selectGetArticlesRes = createSelector(
  selectBlogState,
  (state) => state.getArticlesRes
);

export const selectArticle = createSelector(
  selectBlogState,
  (state) => state.article
);

export const selectTotalCount = createSelector(
  selectBlogState,
  (state) => state.pagination.totalCount
)

export const selectHasNextPage = createSelector(
  selectBlogState,
  (state) => state.pagination.hasNextPage
)

export const selectSkipped = createSelector(
  selectBlogState,
  (state) => state.pagination.skipped
)

export const selectLimit = createSelector(
  selectBlogState,
  (state) => state.pagination.limit
)
