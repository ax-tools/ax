import { reducer, store } from '../test/test.state';
import { ax } from './state';
import { tagDispatch } from './tag';

describe('state', () => {
  const dispatch = ax(store, reducer);

  it('updates for single bit', async () => {
    await dispatch({ type: 'todos.add', text: 'test' });
    expect(store.getState().todos).toEqual([{ text: 'test', done: false }]);

    await dispatch({
      type: 'auth.logout',
      username: Object.keys(store.getState().logins)[0],
    });
    expect(store.getState().logins).toEqual({});
  });

  it('can tag a dispatch', () => {
    const taggedDispatch = tagDispatch(dispatch, 'todos');

    expect(taggedDispatch).toBeInstanceOf(Function);
  });

  it('can work when no reducer bit handles an action', async () => {
    await dispatch({ type: 'doesnt.exist' });

    expect(store.getState()).toBeTruthy();
  });
});
