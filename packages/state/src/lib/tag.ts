import { Dispatch } from './state.api.types';

export function tagDispatch<T, A, Tag extends string>(
  dispatch: Dispatch<T, A>,
  _tag: Tag
) {
  return dispatch as Dispatch<T, Extract<A, { type: `${Tag}.${string}` }>>;
}
