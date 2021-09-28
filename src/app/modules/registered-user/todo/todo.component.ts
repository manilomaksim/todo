import {Component, OnInit} from '@angular/core';
import {Todo} from '../../../interfaces/todo/todo.interface';
import {TodoService} from '../../../shared/services/todo.service';
import {
  CdkDragDrop, CdkDragEnd,
  CdkDragStart,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import {AuthService} from '../../../shared/services/auth.service';
import {select, Store} from '@ngrx/store';
import {selectActiveTodos, selectNonActiveTodos, selectTodos} from '../../../store/selectors/todo.selector';
import {addTodo, getTodos, getTodosSuccess, removeTodo, toggleActivity} from '../../../store/actions/todo.actions';
import {Observable} from 'rxjs';
import {IAppState} from '../../../store/state/app.state';

@Component({
  selector: "todo-comp",
  templateUrl: "todo.component.html",
  styleUrls: ["todo.component.scss"]
})
export class TodoComponent implements OnInit{
  name = "";
  items: Todo[] = [];
  isDragging = false;
  todos$: Observable<Todo[]> = this.store.select(selectTodos);
  nonActiveItems$: Observable<Todo[]> = this.store.select(selectNonActiveTodos);
  activeItems$: Observable<Todo[]> = this.store.select(selectActiveTodos);

  constructor(private todoService: TodoService,
              private store: Store<IAppState>)
  { }

  ngOnInit() {
    this.fetchUserTodos();
    this.todos$.subscribe((todos) =>
      {
        console.log(todos);
        this.items = todos;
      }
    );
  }

  // fetchUserTodos(){
  //   const userId = this.authService.getUser('_id');
  //   this.todoService.getUserTodos(Number(userId))
  //     .subscribe((data) => this.items=data);
  // }

  fetchUserTodos() {
    this.store.dispatch(getTodos());
  }

  addTodo(title: string) {
    // this.todoService.addTodo(title)
    //   .subscribe(() => {
    //     this.fetchUserTodos();
    //   });
    this.store.dispatch(addTodo({ title }))
    //this.fetchUserTodos();
    this.name="";
  }

  drop(event: CdkDragDrop<Todo[]>) {
    const item = event.item.data;

    if (event.previousContainer === event.container) {
      return;
    }
    // this.todoService.toggleActivity(item._id, !item.isDone)
    //   .subscribe(() => {
    //     this.fetchUserTodos();
    //   });

    this.store.dispatch(toggleActivity({ id: item._id }));
    //this.fetchUserTodos();
  }

  removeDropItem(event: CdkDragDrop<Todo[]>) {
    const item = event.item.data;

    // this.todoService.removeTodo(item._id)
    //   .subscribe(() => {
    //     this.fetchUserTodos();
    //   });

    this.store.dispatch(removeTodo({id: item._id}));
    //this.fetchUserTodos();
  }

  dragStarted(event: CdkDragStart) {
    this.isDragging = true;
  }

  dragEnded(event: CdkDragEnd) {
    this.isDragging = false;
  }
}
