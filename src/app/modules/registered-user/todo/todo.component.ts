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

  fetchUserTodos() {
    this.store.dispatch(getTodos());
  }

  addTodo(title: string) {
    this.store.dispatch(addTodo({ title }))
    this.name="";
  }

  drop(event: CdkDragDrop<Todo[]>) {
    const item = event.item.data;

    if (event.previousContainer === event.container) {
      return;
    }
    this.store.dispatch(toggleActivity({ id: item._id }));
  }

  removeDropItem(event: CdkDragDrop<Todo[]>) {
    const item = event.item.data;
    this.store.dispatch(removeTodo({id: item._id}));
  }

  dragStarted(event: CdkDragStart) {
    this.isDragging = true;
  }

  dragEnded(event: CdkDragEnd) {
    this.isDragging = false;
  }
}
