import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {TodoService} from '../../shared/services/todo.service';
import {catchError, map, mergeMap, switchMap, take, tap} from 'rxjs/operators';
import {
  addTodo, addTodoError, addTodoSuccess,
  getTodos,
  getTodosError,
  getTodosSuccess, removeTodo, removeTodoError, removeTodoSuccess,
  toggleActivity,
  toggleActivityError,
  toggleActivitySuccess
} from '../actions/todo.actions';
import {EMPTY, of} from 'rxjs';
import {IAppState} from '../state/app.state';
import {Store} from '@ngrx/store';
import {getTodoById} from '../selectors/todo.selector';

@Injectable()
export class TodoEffects {

  getTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTodos),
      mergeMap(() => this.todoService.getCurrentUserTodos()),
      map((todos) => getTodosSuccess({ todos }))
    )
  );

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTodo),
      mergeMap((todo) => {
        if(!todo) {
          throw Error('Error!!!');
        }
        return this.todoService.addTodo(todo.title).pipe(
          map((res) => addTodoSuccess({ todo: res.newTodo })),
          catchError((todo) => {
            return of(addTodoError({ todo }))
          })
        )
      }),
    )
  );

  toggleActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(toggleActivity),
      switchMap(({ id }) => {
        return this.store.select(getTodoById(id)).pipe(take(1))
      }),
      switchMap((todo) => {
        if (!todo) {
          throw Error('There is no todo with this id!');
        }
        return this.todoService.toggleActivity(todo._id, todo.isDone).pipe(
          map(() => toggleActivitySuccess({ id: todo._id})),
          catchError(() => {
            return of(toggleActivityError({ id: todo._id }))
          })
        );
      }),
    )
  );

  removeTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeTodo),
      switchMap(({ id }) => {
        return this.store.select(getTodoById(id)).pipe(take(1))
      }),
      mergeMap((todo) => {
        if (!todo) {
          throw Error('There is no todo with this id!');
        }
        return this.todoService.removeTodo(todo._id).pipe(
          map(() => removeTodoSuccess({ id: todo._id })),
          catchError(() => {
            return of(removeTodoError({ todo }))
          })
        );
      }),
    )
  );

  constructor(
    private actions$: Actions,
    private todoService: TodoService,
    private store: Store<IAppState>
  ) {}
}
