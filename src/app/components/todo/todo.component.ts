import {Component, OnInit} from '@angular/core';
import {Todo} from '../../interfaces/todo.interface';
import {TodoService} from '../../shared/services/todo.service';
import {
  CdkDragDrop, CdkDragEnd,
  CdkDragStart,
  transferArrayItem
} from '@angular/cdk/drag-drop';

@Component({
  selector: "todo-comp",
  templateUrl: "todo.component.html",
  styleUrls: ["todo.component.scss"]
})
export class TodoComponent implements OnInit{
  name = "";
  items: Todo[] = [];
  isDragging = false;

  constructor(public todoService: TodoService) { }

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
    this.name="";
  }

  drop(event: CdkDragDrop<Todo[]>){
    const item = event.item.data;

    if (event.previousContainer === event.container) {
      return;
    }
    transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);
    this.todoService.toggleActivity(item._id, !item.isDone)
      .subscribe(() => {
        this.fetchTodos();
      });
  }

  removeDropItem(event: CdkDragDrop<Todo[]>){
    const item = event.item.data;

    this.todoService.removeTodo(item._id)
      .subscribe(() => {
        this.fetchTodos();
      });
  }

  dragStarted(event: CdkDragStart) {
    this.isDragging = true;
  }

  dragEnded(event: CdkDragEnd) {
    this.isDragging = false;
  }
}
