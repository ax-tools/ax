type Maybe<T> = T | undefined;
type Awaitable<T> = T | Promise<T>;

export type ReducerReturn<T> = Awaitable<Maybe<Partial<T>>>;

export type Dispatch<T, A> = (action: A) => Promise<T>;

export type Reducer<T, A> = (
  getState: () => T,
  action: A,
  dispatch: Dispatch<T, A>,
) => ReducerReturn<T>;
