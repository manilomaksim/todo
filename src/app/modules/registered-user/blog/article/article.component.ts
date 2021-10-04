import {Component, OnInit} from '@angular/core';
import {BlogService} from '../../../../shared/services/blog.service';
import {ActivatedRoute} from '@angular/router';
import {Article} from '../../../../interfaces/blog/article.interface';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../../store/state/app.state';
import {getArticle} from '../../../../store/actions/blog.actions';
import {Observable} from 'rxjs';
import {selectArticle} from '../../../../store/selectors/blog.selector';

@Component({
  selector: 'article-comp',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  article: Article | undefined = undefined;

  article$: Observable<Article> = this.store.select(selectArticle);

  constructor(private blogService: BlogService,
              private activateRoute: ActivatedRoute,
              private store: Store<IAppState>
             ) { }

  ngOnInit(): void {
    this.fetchArticle();
  }

  fetchArticle(){
    const id = this.activateRoute.snapshot.params['id'];
    // return this.blogService.getArticle(id)
    //   .subscribe((data) => {
    //     this.article = data;
    //   });
    //console.log(this.article$.subscribe((data) => data.title));

    this.store.dispatch(getArticle({ id }));
  }
}
