import { Component } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'nav-comp',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  constructor(private authService: AuthService) {
  }

  get email() {
    return this.authService.getUser('email');
  }

  get isLoggedIn(){
    return !!this.authService.getUser();
  }

  logOut(){
    this.authService.removeToken();
  }
}
