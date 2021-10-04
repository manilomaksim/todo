import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Article} from '../../interfaces/blog/article.interface';
import {GetArticlesRes} from '../../interfaces/blog/get-articles-res.interface';
import {PostArticlesRes} from '../../interfaces/blog/post-articles-res.interface';
import {CreateArticle} from '../../interfaces/blog/create-article.interface';
import {GetArticleRes} from '../../interfaces/blog/get-article-res.interface';
import {Pagination} from '../../interfaces/blog/pagination.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly URL = 'http://localhost:3000/article';

  constructor(private http: HttpClient) { }

  getArticles(skip: number, limit: number): Observable<GetArticlesRes>{
    const params = { skip, limit };
    return this.http.get<GetArticlesRes>(this.URL, { params });
  }

  // getCurrentArticles(skip: number, limit: number): Observable<Article[]>{
  //   return this.getArticles(skip, limit).pipe(
  //     map((data) => data.articles)
  //   );
  // }

  // getPagination(skip: number, limit: number): Observable<Pagination>{
  //   return this.getArticles(skip, limit).pipe(
  //     map((data) =>  {
  //       return {
  //         skipped: data.skipped,
  //         totalCount: data.totalCount,
  //         hasNextPage: data.hasNextPage
  //       };
  //     })
  //   );
  // }

  getArticle(id: string): Observable<Article>{
    const url = this.URL + "/" + id;
    return this.http.get<GetArticleRes>(url).pipe(
      map((data: GetArticleRes) => data.article));
  }

  addArticle(article: CreateArticle): Observable<PostArticlesRes> {
    return this.http.post<PostArticlesRes>(this.URL, article);
  }
}
