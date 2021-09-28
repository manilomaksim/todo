import {ActionReducerMap} from '@ngrx/store';
import {routerReducer} from '@ngrx/router-store';
import {todoReducer} from './todo.reducer'
import {IAppState} from '../state/app.state';

export const appReducer: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  todos: todoReducer
}
