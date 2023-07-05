import { Dispatch, Reducer } from './state.api.types';
import { StoreApi } from './store.types';

export function ax<T, A>(store: StoreApi<T>, reducer: Reducer<T, A>) {
  const dispatch: Dispatch<T, A> = async (action: A) => {
    const newState = await reducer(store.getState, action, dispatch);
    if (newState) store.setState(newState);

    return store.getState();
  };

  return dispatch;
}
