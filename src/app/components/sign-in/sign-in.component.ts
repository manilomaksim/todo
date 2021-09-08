import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'sign-in-comp',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  loginForm: FormGroup = this.formBuilder.group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  });
  isNotExist = false;
  isIncorrect = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: Router
  ) { }

  login(){
    const { login, password } = this.loginForm.value;
    if (!login || !password) {
      return;
    }
    this.authService.login(login, password)
      .subscribe((data) => {
        if(data.token){
          this.authService.setToken(data);
          this.loginForm.reset();
          this.route.navigate(['/todos']);
        } else this.isIncorrect = true;
      }, (error) => {
        if (error.status === 401) {
          this.isNotExist = true;
        }
      });
    this.isNotExist = false;
    this.isIncorrect = false;
  }

}
