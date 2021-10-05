import { Component, OnInit } from '@angular/core';
import { Todo } from '../../../interfaces/todo/todo.interface';
import {
  CdkDragDrop, CdkDragEnd,
  CdkDragStart
} from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { TodoSandboxService } from '../../../shared/facades/todo-sandbox.service';

@Component({
  selector: "todo-comp",
  templateUrl: "todo.component.html",
  styleUrls: ["todo.component.scss"]
})
export class TodoComponent implements OnInit{
  name = "";
  items: Todo[] = [];
  isDragging = false;

  todos$: Observable<Todo[]> = this.todoSandbox.todos$;
  nonActiveItems$: Observable<Todo[]> = this.todoSandbox.nonActiveItems$;
  activeItems$: Observable<Todo[]> = this.todoSandbox.activeItems$;

  constructor(private todoSandbox: TodoSandboxService)
  { }

  ngOnInit() {
    this.fetchUserTodos();
  }

  fetchUserTodos() {
    this.todoSandbox.getUserTodos();
  }

  addTodo(title: string) {
    this.todoSandbox.addTodo(title);
    this.name="";
  }

  dropTodo(event: CdkDragDrop<Todo[]>) {
    const item = event.item.data;
    if (event.previousContainer === event.container) {
      return;
    }
    this.todoSandbox.toggleActivity(item._id);
  }

  removeDropTodo(event: CdkDragDrop<Todo[]>) {
    const item = event.item.data;
    this.todoSandbox.removeTodo(item._id);
  }

  dragStarted(event: CdkDragStart) {
    this.isDragging = true;
  }

  dragEnded(event: CdkDragEnd) {
    this.isDragging = false;
  }
}
