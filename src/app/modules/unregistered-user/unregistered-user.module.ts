import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { GuestGuardService } from '../../shared/guards/guest-guard.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent, canActivate: [GuestGuardService] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [GuestGuardService] },
  { path: '**', redirectTo: 'sign-in' }
];

@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  exports: [RouterModule]
})
export class UnregisteredUserModule { }
