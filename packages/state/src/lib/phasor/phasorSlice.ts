import { PhasorActions, PhasorActionsInternal } from './phasorSlice.types';

import { Dispatch, Reducer } from '../state.api.types';

import { Phase, PhasorObject, Result, isEnded, isReady } from '@ax/phasors';

export function phasorSlice<
  Name extends string,
  Input extends object,
  Output extends object,
>(name: Name, fn: (input: Input) => Promise<Output>) {
  type StatePartial = {
    [N in Name]: PhasorObject<Input, Output>;
  };

  const initial = {
    [name]: {
      phase: Phase.ready,
    },
  } as StatePartial;

  const actions = {
    run(input: Input): PhasorActions<Name, Input> {
      return {
        type: '://run',
        name,
        payload: {
          input,
        },
      };
    },
    rerun(input?: Input): PhasorActions<Name, Input> {
      return {
        type: '://rerun',
        name,
        payload: {
          input,
        },
      };
    },
  };

  const reducerSlice: Reducer<
    StatePartial,
    PhasorActionsInternal<Name, Input, Output>
  > = (async (
    getState: () => StatePartial,
    action: PhasorActionsInternal<Name, Input, Output>,
    dispatch: Dispatch<
      StatePartial,
      PhasorActionsInternal<Name, Input, Output>
    >,
  ) => {
    if (action.name !== name) return;

    const getPartial = () => getState()[name];

    switch (action.type) {
      case '://set': {
        return {
          [name]: action.payload,
        };
      }

      case '://run': {
        const currentPartial = getPartial();

        if (isReady(currentPartial)) {
          await dispatch(actions.run(action.payload.input));
        } else if (isEnded(currentPartial)) {
          await dispatch(actions.rerun(action.payload.input));
        } else {
          return getState();
        }

        try {
          const result = await fn(action.payload.input);
          return {
            [name]: {
              phase: Phase.end,
              input: action.payload.input,
              result: Result.Ok(result),
            },
          };
        } catch (error) {
          return {
            [name]: {
              phase: Phase.end,
              input: action.payload.input,
              result: Result.Err(error),
            },
          };
        }
      }

      case '://rerun': {
        const currentPartial = getPartial();

        if (isEnded(currentPartial)) {
          const input = action.payload.input || currentPartial.input;
          return await dispatch(actions.run(input));
        }

        return getState();
      }
    }
  }) as Reducer<StatePartial, PhasorActionsInternal<Name, Input, Output>>;

  return [
    initial,
    reducerSlice as Reducer<StatePartial, PhasorActions<Name, Input>>,
    actions,
  ] as const;
}
