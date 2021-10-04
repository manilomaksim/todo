import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { todoReducer } from './todo.reducer'
import { IAppState } from '../state/app.state';
import { blogReducer } from './blog.reducer';

export const appReducer: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  todos: todoReducer,
  getArticleRes: blogReducer
}
