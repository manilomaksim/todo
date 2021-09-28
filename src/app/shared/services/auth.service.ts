import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostAuthRes } from '../../interfaces/user/post-auth-res.interface';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { User } from '../../interfaces/user/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL = 'http://localhost:3000/users';
  private readonly LS_LEY_TOKEN = 'token';

  constructor(private http: HttpClient) { }


  login(email: string, password: string): Observable<PostAuthRes>{
    const body = { email, password };
    const url = `${this.URL}/login`;
    return this.http.post<PostAuthRes>(url, body);
  }

  get token(){
    return localStorage.getItem(this.LS_LEY_TOKEN);
  }

  setToken(data: PostAuthRes) {
    localStorage.setItem("token", data.token);
  }

  getUser(field?: keyof User): User | number | string | Date | null {
    if (!this.token) {
      return null;
    }
    const decoded = jwt_decode(this.token) as User;
    return field ? decoded[field] : decoded;
  }

  removeToken() {
    return localStorage.removeItem(this.LS_LEY_TOKEN);
  }
}
