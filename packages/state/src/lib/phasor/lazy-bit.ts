import { Phasor, isOngoing } from '@ax/phasors';
import { ReducerBit } from '../state.api.types';
import { getResult } from './get-result';
import { getTriggerPayload } from './get-trigger-payload';
import { Actions, Fetcher, InternalActions, StateBit } from './lazy-bit.types';

export function lazyBit<I, D, E, N extends string>(
  fetcher: Fetcher<I, D>,
  name: N
) {
  type dT = StateBit<I, D, E, N>;

  const init: dT = {
    [name]: Phasor.ready(),
  } as dT;

  const reducer: ReducerBit<
    dT,
    InternalActions<I, D, E, N> | Actions<I, N>
  > = async (getState, action, dispatch) => {
    if (!action.type.startsWith('://')) return undefined;

    switch (action.type) {
      case '://set': {
        return {
          [name]: action.phasor,
        } as dT;
      }
      case '://trigger': {
        const phasor = getState()[name];

        if (isOngoing(phasor)) return undefined;

        await dispatch({
          type: '://set',
          name,
          phasor: getTriggerPayload(phasor, action),
        });

        const result = await getResult<I, D, E>(fetcher, action.input);

        await dispatch({
          type: '://set',
          name,
          phasor: Phasor.end(action.input, result),
        });
      }
    }

    return undefined;
  };

  return [init, reducer as ReducerBit<dT, Actions<I, N>>] as const;
}
