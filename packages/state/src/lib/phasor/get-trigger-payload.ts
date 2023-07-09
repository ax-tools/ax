import { Ongoing, Phasor, Resting, isEnded, isReady } from '@ax/phasors';
import { Actions } from './lazy-bit.types';

export function getTriggerPayload<I, D, E, N extends string>(
  phasor: Resting<I, D, E>,
  action: Actions<I, N>
): Ongoing<I, D, E> {
  if (isReady(phasor)) {
    return Phasor.run(action.input);
  }

  if (isEnded(phasor)) {
    return Phasor.rerun(action.input, phasor.result);
  }

  throw new Error('Unexpected phasor phase');
}
