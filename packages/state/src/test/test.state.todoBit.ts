import { TodoActions, TodosBit } from './test.state.todoBit.types';
import { MyReducerBit } from './test.state.types';

export const todoReducerBit: MyReducerBit<TodosBit, TodoActions> = async (
  getState,
  action,
  _dispatch
) => {
  if (
    action.type.startsWith('todos') &&
    Object.keys(getState().logins).length === 0
  ) {
    throw new Error('Must be logged in to add todos');
  }

  switch (action.type) {
    case 'todos.add':
      return {
        todos: getState().todos.concat({
          text: action.text,
          done: false,
        }),
      };
    case 'todos.toggle':
      return {
        todos: getState().todos.map((todo, index) =>
          index === action.index ? { ...todo, done: !todo.done } : todo
        ),
      };
    case 'todos.remove':
      return {
        todos: getState().todos.filter((_, index) => index !== action.index),
      };
  }
};
