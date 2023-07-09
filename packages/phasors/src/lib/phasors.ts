import {
  EndPhase,
  Ongoing,
  Phase,
  Phasor,
  ReadyPhase,
  RerunPhase,
  Resting,
  RunPhase,
} from './phasors.types';

function isIt<I, T, E>(phasor: Phasor<I, T, E>, it: Phase) {
  return phasor.phase === it;
}

export const isReady = <I, T, E>(
  phasor: Phasor<I, T, E>
): phasor is ReadyPhase => isIt(phasor, Phase.ready);

export const isRunning = <I, T, E>(
  phasor: Phasor<I, T, E>
): phasor is RunPhase<I> => isIt(phasor, Phase.run);

export const isEnded = <I, T, E>(
  phasor: Phasor<I, T, E>
): phasor is EndPhase<I, T, E> => isIt(phasor, Phase.end);

export const isRerunning = <I, T, E>(
  phasor: Phasor<I, T, E>
): phasor is RerunPhase<I, T, E> => isIt(phasor, Phase.rerun);

export const isOngoing = <I, T, E>(
  phasor: Phasor<I, T, E>
): phasor is Ongoing<I, T, E> => isRunning(phasor) || isRerunning(phasor);

export const isResting = <I, T, E>(
  phasor: Phasor<I, T, E>
): phasor is Resting<I, T, E> => isReady(phasor) || isEnded(phasor);
