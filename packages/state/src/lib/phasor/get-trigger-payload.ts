import { Resting, Ongoing, isReady, Phase, isEnded } from '@ax/phasors';
import { Actions } from './lazy-bit.types';

export function getTriggerPayload<I, D, E, N extends string>(
  phasor: Resting<I, D, E>,
  action: Actions<I, N>
): Ongoing<I, D, E> {
  if (isReady(phasor)) {
    return {
      phase: Phase.run,
      input: action.input,
    };
  }

  if (isEnded(phasor)) {
    return {
      phase: Phase.rerun,
      input: action.input,
      lastResult: phasor.result,
    };
  }

  throw new Error('Unexpected phasor phase');
}
