import { Component, OnInit } from '@angular/core';
import { Article } from '../../../interfaces/blog/article.interface';
import { MatDialog } from '@angular/material/dialog';
import { BlogDialogComponent } from './blog-dialog/blog-dialog.component';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BlogSandboxService } from '../../../shared/facades/blog-sandbox.service';

@Component({
  selector: 'blog-comp',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})

export class BlogComponent implements OnInit {
  title: string = "";
  text: string = "";
  tags: string[] = [];

  articles$: Observable<Article[]> = this.blogSandbox.articles$;
  totalCount$: Observable<number> = this.blogSandbox.totalCount$;
  hasNextPage$: Observable<boolean> = this.blogSandbox.hasNextPage$;

  constructor(public dialog: MatDialog,
              private blogSandbox: BlogSandboxService
              ) { }

  ngOnInit(): void {
    this.fetchArticles();
  }

  fetchArticles(){
    this.blogSandbox.getNextPage();
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
