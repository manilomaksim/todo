import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';
import {Todo} from '../interfaces/todo.interface';
import {GetTodosRes} from '../interfaces/get-todos-res.service';
import {PostTodosRes} from '../interfaces/post-todos-res.service';
import {PutTodosRes} from '../interfaces/put-todos-res.service';
import {DeleteTodosRes} from '../interfaces/delete-todos-res.service';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly URL = 'http://localhost:3000/todo';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]>{
    return this.http.get<GetTodosRes>(this.URL).pipe(
      map((data: GetTodosRes) => data.todos));
  }

  addTodo(title: string): Observable<PostTodosRes> {
    const body = { title };
    return this.http.post<PostTodosRes>(this.URL, body);
  }

  toggleActivity(id: number, isDone: boolean): Observable<PutTodosRes>{
    const url = `${this.URL}/${id}`;
    const body = { isDone };
    return this.http.put<PutTodosRes>(url, body);
  }

  removeTodo(id: number): Observable<DeleteTodosRes>{
    const url = `${this.URL}/${id}`;
    return this.http.delete<DeleteTodosRes>(url);
  }
}
