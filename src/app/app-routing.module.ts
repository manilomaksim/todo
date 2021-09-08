import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TodoComponent} from './components/todo/todo.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {AuthGuardService} from './shared/guards/auth-guard.service';
import {GuestGuardService} from './shared/guards/guest-guard.service';

const routes: Routes = [
  { path: 'todos', component: TodoComponent, canActivate: [AuthGuardService] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [GuestGuardService] },
  { path: 'sign-in', component: SignInComponent, canActivate: [GuestGuardService] },
  { path: '**', redirectTo: 'todos' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
