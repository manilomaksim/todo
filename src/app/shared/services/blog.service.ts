import {Injectable, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Article} from '../../interfaces/blog/article.interface';
import {GetArticlesRes} from '../../interfaces/blog/get-articles-res.interface';
import {PostArticlesRes} from '../../interfaces/blog/post-articles-res.interface';
import {addAriaReferencedId} from '@angular/cdk/a11y/aria-describer/aria-reference';
import {CreateArticle} from '../../interfaces/blog/create-article.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly URL = 'http://localhost:3000/article';

  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]>{
    return this.http.get<GetArticlesRes>(this.URL).pipe(
      map((data: GetArticlesRes) => data.articles));
  }

  addArticle(article: CreateArticle): Observable<PostArticlesRes> {
    return this.http.post<PostArticlesRes>(this.URL, article);
  }
}
