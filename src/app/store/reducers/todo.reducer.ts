import {Action, createReducer, on} from '@ngrx/store';
import {initialTodoState, ITodoState} from '../state/todo.state';
import {
  addTodoError,
  addTodoSuccess, getTodosError,
  getTodosSuccess, removeTodoError, removeTodoSuccess,
  toggleActivity,
  toggleActivityError, toggleActivitySuccess
} from '../actions/todo.actions';

const _todoReducer = createReducer(
  initialTodoState,
  on(getTodosSuccess, (state, { todos }) => {
    return { ...state, todos };
  }),
  on(addTodoSuccess, (state, { todo }) => {
    return { state, todos: [...state.todos, todo] }
  }),
  on(addTodoError, (state, { todo }) => {
    console.log(`ERROR!!! Failed to add item: ${ todo.title }`);
    return { ...state, todo }
  }),
  on(toggleActivity, (state, { id }) => {
    const todos = state.todos.map((item) => {
      return item._id === id
        ? { ...item, isDone: !item.isDone }
        : item;
    });
    return { ...state, todos };
  }),
  on(toggleActivitySuccess, (state) => {
    console.log('SUCCESS!');
    return state;
  }),
  on(toggleActivityError, (state, { id }) => {
    console.log("ERROR!!!", id);
    const todos = state.todos.map((item) => {
      return item._id === id
        ? { ...item, isDone: !item.isDone }
        : item;
    });
    return { ...state, todos };
  }),
  on(removeTodoSuccess, (state, { id }) => {
    console.log(`Item ${ id } successfully removed!`);
    const todos = state.todos.filter((item) => item._id !== id);
    return { ...state, todos };
  }),
  on(removeTodoError, (state, { todo }) => {
    console.log(`ERROR!!! Failed to remove item: ${ todo.title }`);
    return { ...state, todo };
  })
);

export function todoReducer(state: ITodoState | undefined, action: Action) {
  return _todoReducer(state, action);
}
