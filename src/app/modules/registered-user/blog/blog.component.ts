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
  title = "";
  text = "";
  tags: string[] = [];
  articles: Article[] = [];

  constructor(public dialog: MatDialog,
              private authService: AuthService,
              private blogService: BlogService,
              ) { }

  ngOnInit(): void {
    this.fetchArticles();
  }

  fetchArticles(){
    this.blogService.getArticles()
      .subscribe((data) => this.articles=data);
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
      console.log('The dialog was closed');
      this.title = result.title;
      this.text = result.text;
      this.tags = result.tags;
      this.fetchArticles();
    });
  }
}
