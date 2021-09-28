import { Todo } from '../../interfaces/todo/todo.interface';

export interface ITodoState {
  todos: Todo[]
}

export const initialTodoState: ITodoState = {
  todos: []
};
