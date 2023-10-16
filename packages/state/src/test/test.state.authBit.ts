import { Reducer } from '../lib/state.api.types';
import { AuthActions } from './test.state.authBit.types';
import { State } from './test.state.types';

export const authReducerBit: Reducer<State, AuthActions> = async (
  getState,
  action,
) => {
  switch (action.type) {
    case 'auth.login':
      return {
        logins: {
          ...getState().logins,
          [action.username]: {
            username: action.username,
            email: 'email',
            token: 'token',
            expires: 0,
          },
        },
      };
    case 'auth.logout': {
      const newLogins = getState().logins;
      delete newLogins[action.username];
      console.debug('new logins', newLogins);
      return {
        logins: newLogins,
      };
    }
  }
};
