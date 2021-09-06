import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'sign-in-comp',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  loginForm: FormGroup = this.formBuilder.group({
    login: ['', [Validators.required, Validators.minLength(1)]],
    password: ['', [Validators.required, Validators.minLength(1)]]
  });
  isNotExist = false;
  isIncorrect = false;

  constructor(private formBuilder: FormBuilder) {
  }

  submit(){
    console.log(this.loginForm.value);
    this.loginForm.reset();
  }

}
