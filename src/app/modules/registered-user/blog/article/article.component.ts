import {Component, OnInit} from '@angular/core';
import {BlogService} from '../../../../shared/services/blog.service';
import {ActivatedRoute} from '@angular/router';
import {Article} from '../../../../interfaces/blog/article.interface';

@Component({
  selector: 'article-comp',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  article: Article | undefined = undefined;

  constructor(private blogService: BlogService,
              private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchArticle();
  }

  fetchArticle(){
    const id = this.activateRoute.snapshot.params['id'];
    return this.blogService.getArticle(id)
      .subscribe((data) => {
        this.article = data;
      });
  }
}
