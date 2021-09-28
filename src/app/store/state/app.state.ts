import {RouterReducerState} from '@ngrx/router-store';
import {initialTodoState, ITodoState} from './todo.state';

export interface IAppState {
  router?: RouterReducerState;
  todos: ITodoState
}

export const initialAppState: IAppState = {
  todos: initialTodoState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
