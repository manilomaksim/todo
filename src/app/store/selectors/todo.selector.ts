import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';

export const selectTodosState = (state: IAppState) => state.todos;

export const selectTodos = createSelector(
  selectTodosState,
  (state) => state.todos
);

export const selectActiveTodos = createSelector(
  selectTodos,
  (todos) => todos.filter((item) => item.isDone)
);

export const selectNonActiveTodos = createSelector(
  selectTodos,
  (todos) => todos.filter((item) => !item.isDone)
);

export const getTodoById = (id: string) => createSelector(
  selectTodos,
  (todos) => {
    return todos.find((item) => item._id === id);
  }
);
