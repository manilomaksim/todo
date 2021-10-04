import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { IAppState } from '../state/app.state';
import { Store } from '@ngrx/store';
import {
  addArticle, addArticleError, addArticleSuccess,
  getArticle,
  getArticles,
  getArticlesResSuccess,
  getArticleSuccess
} from '../actions/blog.actions';
import { BlogService } from '../../shared/services/blog.service';
import { of } from 'rxjs';
import { selectArticlesPagination } from '../selectors/blog.selector';

@Injectable()
export class BlogEffects {

  getArticlesNextPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getArticles),
      withLatestFrom(this.store.select(selectArticlesPagination)),
      switchMap(([, pagination]) => {
        const { skip, limit } = pagination;
        return this.blogService.getArticles(skip, limit);
      }),
      map(({ articles, totalCount, hasNextPage }) => getArticlesResSuccess({ articles, totalCount, hasNextPage }))
    )
  );

  getArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getArticle),
      switchMap(({ id } ) => {
        return this.blogService.getArticle(id).pipe(
          map((article) => getArticleSuccess({ article }))
        );
      })
    )
  );

  addArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addArticle),
      mergeMap(({ article }) => {
        return this.blogService.addArticle(article).pipe(
          map((res) => addArticleSuccess({ article: res.newArticle })),
          catchError((article) => {
            return of(addArticleError({ article }))
          })
        )
      }),
    )
  );

  constructor(
    private actions$: Actions,
    private blogService: BlogService,
    private store: Store<IAppState>
  ) {}
}
