import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../interfaces/user.interface';
import { GetUsersRes } from '../../interfaces/get-users-res.interface';
import { PostUsersRes } from '../../interfaces/post-users-res.interface';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly URL = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<GetUsersRes>(this.URL).pipe(
      map((data: GetUsersRes) => data.users));
  }

  addUser(email: string, password: string): Observable<PostUsersRes> {
    const body = { email, password };
    return this.http.post<PostUsersRes>(this.URL, body);
  }
}
