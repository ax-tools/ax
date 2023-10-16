import { Reducer } from '../lib/state.api.types';
import { TodoActions } from './test.state.todoBit.types';
import { State } from './test.state.types';

export const todoReducerBit: Reducer<State, TodoActions> = async (
  getState,
  action,
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
          index === action.index ? { ...todo, done: !todo.done } : todo,
        ),
      };
    case 'todos.remove':
      return {
        todos: getState().todos.filter((_, index) => index !== action.index),
      };
  }
};
