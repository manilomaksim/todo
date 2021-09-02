import {Component, OnInit} from '@angular/core';
import {Todo} from '../../interfaces/todo.interface';
import {TodoService} from '../../shared/todo.service';

@Component({
  selector: "todo-comp",
  templateUrl: "todo.component.html",
  styleUrls: ["todo.component.scss"]
})
export class TodoComponent implements OnInit{
  name = "";
  items: Todo[] = [];

  constructor(public todoService: TodoService) {
  }

  ngOnInit() {
    this.fetchTodos();
  }

  fetchTodos(){
    this.todoService.getTodos()
      .subscribe((data) => this.items=data);
  }

  get nonActiveItems(){
    return this.items.filter((item) => !item.isDone);
  }

  get activeItems(){
    return this.items.filter((item) => item.isDone);
  }

  addTodo(title: string){
    this.todoService.addTodo(title)
      .subscribe(() => {
        this.fetchTodos();
      });
  }

}
