import { Dispatch, Reducer, ReducerReturn } from './state.api.types';

export function combine<T, A>(
  // This can only be `any` to allow for any composition
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
