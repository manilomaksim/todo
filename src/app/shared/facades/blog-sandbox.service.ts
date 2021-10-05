import { Injectable } from '@angular/core';
import { Store} from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';
import { getArticles } from '../../store/actions/blog.actions';
import { selectArticles, selectHasNextPage, selectTotalCount } from '../../store/selectors/blog.selector';
import { Observable } from 'rxjs';
import { Article } from '../../interfaces/blog/article.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogSandboxService {

  articles$: Observable<Article[]>;
  totalCount$: Observable<number>;
  hasNextPage$: Observable<boolean>;

  constructor(private store: Store<IAppState>)
  {
    this.articles$ = store.select(selectArticles);
    this.totalCount$ = store.select(selectTotalCount);
    this.hasNextPage$ = store.select(selectHasNextPage);
  }

  getNextPage() {
    this.store.dispatch(getArticles());
  }
}
