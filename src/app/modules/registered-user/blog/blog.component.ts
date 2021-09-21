import { Component, OnInit } from '@angular/core';
import {Article} from '../../../interfaces/blog/article.interface';
import {MatDialog} from '@angular/material/dialog';
import {BlogDialogComponent} from './blog-dialog/blog-dialog.component';
import {AuthService} from '../../../shared/services/auth.service';
import {BlogService} from '../../../shared/services/blog.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'blog-comp',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})

export class BlogComponent implements OnInit {
  title: string = "";
  text: string = "";
  tags: string[] = [];
  articles: Article[] = [];
  skip: number = 0;
  readonly limit: number = 4;
  hasNextPage: boolean = false;
  totalCount: number = 0;
  skipped: number = 0;

  constructor(public dialog: MatDialog,
              private authService: AuthService,
              private blogService: BlogService,
              ) { }

  ngOnInit(): void {
    this.fetchArticles(this.skip, this.limit);
  }

  fetchArticles(skip: number, limit: number){
    this.blogService.getArticles(skip, limit)
      .subscribe((data) => {
        this.articles = [...this.articles, ...data.articles];
        this.skip += this.limit;
        this.totalCount = data.totalCount;
        this.skipped = data.skipped;
        this.hasNextPage = data.hasNextPage;
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BlogDialogComponent, {
      width: '250px',
      data: { title: this.title, text: this.text, tags: this.tags }
    });

    dialogRef.componentInstance.onSuccess$
      .pipe(take(1))
      .subscribe(() => {
        this.fetchArticles(this.skip, this.limit);
      })


    dialogRef.afterClosed().subscribe(result => {
      this.title = result.title;
      this.text = result.text;
      this.tags = result.tags;
      this.fetchArticles(this.skip, this.limit);
    });
  }

  onScrollDown() {
    this.fetchArticles(this.skip, this.limit);
  }
}
