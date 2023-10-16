import { Dispatch } from './state.api.types';

export function tagDispatch<T, A, Tag extends string>(
  dispatch: Dispatch<T, A>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _tag: Tag,
) {
  return dispatch as Dispatch<T, Extract<A, { type: `${Tag}.${string}` }>>;
}
