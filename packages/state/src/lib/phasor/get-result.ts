import { Result, Kind } from '@ax/phasors';
import { Fetcher } from './lazy-bit.types';

export async function getResult<I, D, E>(
  fetcher: Fetcher<I, D>,
  input: I
): Promise<Result<D, E>> {
  try {
    const result = await fetcher(input);
    return {
      status: Kind.Ok,
      value: result,
    };
  } catch (error) {
    return {
      status: Kind.Err,
      error: error as E,
    };
  }
}
