import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { BlogComponent } from './blog/blog.component';
import { AuthGuardService } from '../../shared/guards/auth-guard.service';
import { BlogItemComponent } from './blog/blog-item/blog-item.component';
import { BlogDialogComponent } from './blog/blog-dialog/blog-dialog.component';
import { TodoItemComponent } from './todo/todoItem/todoItem.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const routes: Routes = [
  { path: 'todos', component: TodoComponent, canActivate: [AuthGuardService] },
  { path: 'blog', component: BlogComponent, canActivate: [AuthGuardService]},
  { path: '**', redirectTo: 'todos' }
];

@NgModule({
  declarations: [
    BlogItemComponent,
    BlogComponent,
    BlogDialogComponent,
    TodoComponent,
    TodoItemComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    DragDropModule,
    MatChipsModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  exports: [RouterModule]
})
export class RegisteredUserModule { }
