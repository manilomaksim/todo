import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthService,
              private route: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) : Observable<boolean> | boolean {
    if(!this.authService.token){
      this.route.navigate(['guest/sign-up']);
    }
    return true;
  }
}
