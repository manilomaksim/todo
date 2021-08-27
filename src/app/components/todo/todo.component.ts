import { Component } from '@angular/core';
import {Todo} from '../../interfaces/todo.interface';

@Component({
  selector: "todo-comp",
  templateUrl: "todo.component.html",
  styleUrls: ["todo.component.scss"]
})
export class TodoComponent {
  items: Todo[] = [
    {id: 0, text: "aaa", isDone: false, date: new Date()},
    {id: 1, text: "bbb", isDone: false, date: new Date()},
    {id: 2, text: "ccc", isDone: false, date: new Date()}
  ];
  name = "";

  get activeItems() {
    return this.items.filter(item => item.isDone);
  }

  get nonActiveItems() {
    return this.items.filter(item => !item.isDone);
  }

  addTodo() {
    const todo: Todo = {
      text: this.name,
      id: this.items.length,
      isDone: false,
      date: new Date()
    }
    this.items.push(todo);
    this.name = '';
  }


  onToggle(id: number){
    this.items = this.items.map(item => {
      return item.id === id
        ? { ...item, isDone: !item.isDone }
        : item;
    })
  }

  removeItem(id: number){
    this.items = this.items.filter(item => item.id !== id);
  }
}
