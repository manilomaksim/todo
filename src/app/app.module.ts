import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TodoComponent} from './components/todo/todo.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TodoItemComponent} from './components/todo/todoItem/todoItem.component';
import { NavComponent } from './components/nav/nav.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import {InterceptorService} from './shared/interceptors/interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {_MatMenuDirectivesModule, MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { BlogItemComponent } from './components/blog/blog-item/blog-item.component';
import { BlogComponent } from './components/blog/blog.component';
import {MatChipsModule} from '@angular/material/chips';
import { BlogDialogComponent } from './components/blog/blog-dialog/blog-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoItemComponent,
    NavComponent,
    SignUpComponent,
    SignInComponent,
    BlogItemComponent,
    BlogComponent,
    BlogDialogComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        _MatMenuDirectivesModule,
        MatMenuModule,
        MatCheckboxModule,
        MatIconModule,
        DragDropModule,
        MatChipsModule,
        MatDialogModule,
        MatProgressSpinnerModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
