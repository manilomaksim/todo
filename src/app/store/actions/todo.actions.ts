import {createAction, props} from '@ngrx/store';
import {Todo} from '../../interfaces/todo/todo.interface';

export const getTodos = createAction(
  '[Todos] Get Todos'
)

export const getTodosSuccess = createAction(
  '[Todos] Get Todos Success',
  props<{ todos: Todo[] }>()
)

export const getTodosError = createAction(
  '[Todos] Get Todos Error'
)

export const toggleActivity = createAction(
  '[Todo] ToggleActivity Todo',
  props<{ id: string }>()
)

export const toggleActivitySuccess = createAction(
  '[Todo] ToggleActivity Todo Success',
  props<{ id: string }>()
)

export const toggleActivityError = createAction(
  '[Todo] ToggleActivity Todo Error',
  props<{ id: string }>()
)

export const addTodo = createAction(
  '[Todo] Add Todo',
  props<{ title: string }>()
)

export const addTodoSuccess = createAction(
  '[Todo] Add Todo Success',
  props<{ todo: Todo }>()
)

export const addTodoError = createAction(
  '[Todo] Add Todo Error',
  props<{ todo: Todo }>()
)

export const removeTodo = createAction(
  '[Todo] Remove Todo',
  props<{ id: string }>()
)

export const removeTodoSuccess = createAction(
  '[Todo] Remove Todo Success',
  props<{ id: string }>()
)

export const removeTodoError = createAction(
  '[Todo] Remove Todo Error',
  props<{ todo: Todo }>()
)
