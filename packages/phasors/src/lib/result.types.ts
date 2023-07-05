export const enum Kind {
  Ok,
  Err,
}

export type Ok<T> = {
  status: Kind.Ok;
  value: T;
};

export type Err<E> = {
  status: Kind.Err;
  error: E;
};

export type ResultType<T, E> = Ok<T> | Err<E>;
