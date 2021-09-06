import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TodoComponent} from './components/todo/todo.component';
import {SignInComponent} from './components/sign-in/sign-in.component';

const routes: Routes = [
  {path: 'todos', component: TodoComponent},
  {path: 'sign-in', component: SignInComponent},
  { path: '**', redirectTo: 'todos' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
