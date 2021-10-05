import { Injectable } from '@angular/core';
import { Store} from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';
import { Observable } from 'rxjs';
import { Todo } from '../../interfaces/todo/todo.interface';
import { selectActiveTodos, selectNonActiveTodos, selectTodos } from '../../store/selectors/todo.selector';
import { addTodo, getTodos, removeTodo, toggleActivity } from '../../store/actions/todo.actions';

@Injectable({
  providedIn: 'root'
})
export class TodoSandboxService {

  todos$: Observable<Todo[]>;
  nonActiveItems$: Observable<Todo[]>;
  activeItems$: Observable<Todo[]>;

  constructor(private store: Store<IAppState>)
  {
    this.todos$ = store.select(selectTodos);
    this.nonActiveItems$ = store.select(selectNonActiveTodos);
    this.activeItems$ = store.select(selectActiveTodos);
  }

  getUserTodos() {
    this.store.dispatch(getTodos());
  }

  addTodo(title: string) {
    this.store.dispatch(addTodo({ title }));
  }

  toggleActivity(id: any) {
    this.store.dispatch(toggleActivity({ id }));
  }

  removeTodo(id: any) {
    this.store.dispatch(removeTodo({ id }));
  }
}
