import { AuthActions, AuthBit } from './test.state.authBit.types';
import { MyReducerBit } from './test.state.types';

export const authReducerBit: MyReducerBit<AuthBit, AuthActions> = async (
  getState,
  action,
  _dispatch
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
