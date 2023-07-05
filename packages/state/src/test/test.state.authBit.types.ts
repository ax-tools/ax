export type AuthBit = {
  logins: {
    [username: string]: {
      username: string;
      email: string;
      token: string;
      expires: number;
    };
  };
};

export type AuthActions =
  | {
      type: 'auth.login';
      username: string;
    }
  | {
      type: 'auth.logout';
      username: string;
    };
