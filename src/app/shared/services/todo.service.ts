import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import { Todo} from '../../interfaces/todo/todo.interface';
import { GetTodosRes } from '../../interfaces/todo/get-todos-res.interface';
import { PostTodosRes } from '../../interfaces/todo/post-todos-res.interface';
import { PutTodosRes } from '../../interfaces/todo/put-todos-res.interface';
import { DeleteTodosRes } from '../../interfaces/todo/delete-todos-res.interface';
import {AuthService} from './auth.service';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly URL = 'http://localhost:3000/todo';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getTodos(): Observable<Todo[]>{
    return this.http.get<GetTodosRes>(this.URL).pipe(
      map((data: GetTodosRes) => data.todos));
  }

  getUserTodos(id: string): Observable<Todo[]>{
    return this.http.get<GetTodosRes>(this.URL).pipe(
      map((data: GetTodosRes) => data.todos));
  }

  getCurrentUserTodos(): Observable<Todo[]> {
    //throw 'This is error';
    const userId = this.authService.getUser('_id') as string;
    return this.getUserTodos(userId);
  }

  addTodo(title: string): Observable<PostTodosRes> {
    const userId = this.authService.getUser('_id') as string;
    const body = { title, userId };
    return this.http.post<PostTodosRes>(this.URL, body);
  }

  toggleActivity(id: string, isDone: boolean): Observable<PutTodosRes>{
    const url = `${this.URL}/${id}`;
    const body = { isDone };
    return this.http.put<PutTodosRes>(url, body);
  }

  removeTodo(id: string): Observable<DeleteTodosRes>{
    const url = `${this.URL}/${id}`;
    return this.http.delete<DeleteTodosRes>(url);
  }
}
