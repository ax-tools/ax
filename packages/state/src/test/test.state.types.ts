import { AuthActions, AuthBit } from './test.state.authBit.types';
import { TodoActions, TodosBit } from './test.state.todoBit.types';

export type State = TodosBit & AuthBit;
export type Actions = TodoActions | AuthActions | { type: 'doesnt.exist' };
