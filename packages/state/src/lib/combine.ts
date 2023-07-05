import { Dispatch, Reducer, ReducerReturn } from './state.api.types';

export function combine<T, A>(
  ...reducerBits: ReadonlyArray<(...args: any[]) => ReducerReturn<T>>
): Reducer<T, A> {
  return async (getState: () => T, action: A, dispatch: Dispatch<T, A>) => {
    for (const reducerBit of reducerBits) {
      const newState = await reducerBit(getState, action, dispatch);
      if (newState) return newState;
    }

    return undefined;
  };
}
