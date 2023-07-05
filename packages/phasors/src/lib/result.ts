import { Err, Kind, Ok } from './result.types';

function Ok<T>(value: T): Ok<T> {
  return {
    status: Kind.Ok,
    value,
  };
}

function Err<E>(error: E): Err<E> {
  return {
    status: Kind.Err,
    error,
  };
}

export const Result = {
  Ok,
  Err,
};
