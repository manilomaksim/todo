import { Component, OnInit } from '@angular/core';
import { Article } from '../../../interfaces/blog/article.interface';
import { MatDialog } from '@angular/material/dialog';
import { BlogDialogComponent } from './blog-dialog/blog-dialog.component';
import { AuthService } from '../../../shared/services/auth.service';
import { BlogService } from '../../../shared/services/blog.service';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../store/state/app.state';
import { getArticles } from '../../../store/actions/blog.actions';
import { Observable } from 'rxjs';
import { selectArticles, selectHasNextPage, selectTotalCount }
  from '../../../store/selectors/blog.selector';

@Component({
  selector: 'blog-comp',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})

export class BlogComponent implements OnInit {
  title: string = "";
  text: string = "";
  tags: string[] = [];

  articles$: Observable<Article[]> = this.store.select(selectArticles);
  totalCount$: Observable<number> = this.store.select(selectTotalCount);
  hasNextPage$: Observable<boolean> = this.store.select(selectHasNextPage);

  constructor(public dialog: MatDialog,
              private authService: AuthService,
              private blogService: BlogService,
              private store: Store<IAppState>
              ) { }

  ngOnInit(): void {
    this.fetchArticles();
  }

  fetchArticles(){
    this.store.dispatch(getArticles());
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BlogDialogComponent, {
      width: '250px',
      data: { title: this.title, text: this.text, tags: this.tags }
    });

    dialogRef.componentInstance.onSuccess$
      .pipe(take(1))
      .subscribe(() => {
        this.fetchArticles();
      })

    dialogRef.afterClosed().subscribe(result => {
      this.title = result.title;
      this.text = result.text;
      this.tags = result.tags;
      this.fetchArticles();
    });
  }

  onScrollDown() {
    this.fetchArticles();
  }
}
