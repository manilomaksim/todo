import { RouterReducerState } from '@ngrx/router-store';
import { initialTodoState, ITodoState } from './todo.state';
import { IBlogState, initialBlogState } from './blog.state';

export interface IAppState {
  router?: RouterReducerState;
  getArticleRes: IBlogState
  todos: ITodoState
}

export const initialAppState: IAppState = {
  getArticleRes: initialBlogState,
  todos: initialTodoState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
