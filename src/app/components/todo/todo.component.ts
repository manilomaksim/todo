import {Component, OnInit} from '@angular/core';
import {Todo} from '../../interfaces/todo.interface';
import {TodoService} from '../../shared/services/todo.service';
import {
  CdkDragDrop, CdkDragEnd,
  CdkDragStart,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: "todo-comp",
  templateUrl: "todo.component.html",
  styleUrls: ["todo.component.scss"]
})
export class TodoComponent implements OnInit{
  name = "";
  items: Todo[] = [];
  isDragging = false;

  constructor(private todoService: TodoService,
              private authService: AuthService)
  { }

  ngOnInit() {
    //this.fetchTodos();
    this.fetchUserTodos();
  }

  /*fetchTodos(){
    this.todoService.getTodos()
      .subscribe((data) => this.items=data);
  }*/

  fetchUserTodos(){
    const userId = this.authService.getUser('_id');
    this.todoService.getUserTodos(Number(userId))
      .subscribe((data) => this.items=data);
  }

  get nonActiveItems(){
    return this.items.filter((item) => !item.isDone);
  }

  get activeItems(){
    return this.items.filter((item) => item.isDone);
  }

  addTodo(title: string){
    const userId = this.authService.getUser('_id');
    this.todoService.addTodo(title, Number(userId))
      .subscribe(() => {
        //this.fetchTodos();
        this.fetchUserTodos();
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
        //this.fetchTodos();
        this.fetchUserTodos();
      });
  }

  removeDropItem(event: CdkDragDrop<Todo[]>){
    const item = event.item.data;

    this.todoService.removeTodo(item._id)
      .subscribe(() => {
        //this.fetchTodos();
        this.fetchUserTodos();
      });
  }

  dragStarted(event: CdkDragStart) {
    this.isDragging = true;
  }

  dragEnded(event: CdkDragEnd) {
    this.isDragging = false;
  }
}
