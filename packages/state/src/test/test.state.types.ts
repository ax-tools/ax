import { AuthActions, AuthBit } from './test.state.authBit.types';
import { TodoActions, TodosBit } from './test.state.todoBit.types';
import { ReducerBit } from '../lib/state.api.types';

export type State = TodosBit & AuthBit;
export type Actions = TodoActions | AuthActions | { type: 'doesnt.exist' };
export type MyReducerBit<dT, dA> = ReducerBit<State, Actions, dT, dA>;
