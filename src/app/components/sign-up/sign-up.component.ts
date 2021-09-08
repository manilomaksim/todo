import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UsersService} from '../../shared/services/users.service';

export function MatchingValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}

@Component({
  selector: 'sign-up-comp',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private usersService: UsersService) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      accept: [false, Validators.requiredTrue]
    },
      {
        validator: MatchingValidator('password', "confirmPassword")
      });
  }

  addUser(email: string, password: string){
    this.usersService.addUser(email, password)
      .subscribe(() => {
        console.log("Successfuly added user!");
      });
    this.registerForm.reset();
  }

}


