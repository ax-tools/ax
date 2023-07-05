import { createStore } from 'zustand';
import { combine } from '../lib/combine';
import { authReducerBit } from './test.state.authBit';
import { todoReducerBit } from './test.state.todoBit';
import { Actions, State } from './test.state.types';

const initialState: State = {
  todos: [],
  logins: {
    myname: {
      username: 'myname',
      email: 'email',
      expires: 0,
      token: 'token',
    },
  },
};

export const reducer = combine<State, Actions>(todoReducerBit, authReducerBit);
export const store = createStore(() => initialState);
