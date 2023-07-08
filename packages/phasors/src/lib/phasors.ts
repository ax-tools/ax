import {
  DonePhase,
  FailPhase,
  Phasor,
  ReadyPhase,
  RerunPhase,
  RunPhase,
} from './phasors.types';

function isPhasor<I, T, E, P>(phasor: Phasor<I, T, E>, it: P) {
  return phasor.phase === it;
}

export const isReady = <I, T, E>(phasor: Phasor<I, T, E>): phasor is ReadyPhase => isPhasor(phasor, 'ready');
export const isRun = <I, T, E>(phasor: Phasor<I, T, E>): phasor is RunPhase<I> => isPhasor(phasor, 'run');
export const isDone = <I, T, E>(phasor: Phasor<I, T, E>): phasor is DonePhase<I, T> => isPhasor(phasor, 'done');
export const isFail = <I, T, E>(phasor: Phasor<I, T, E>): phasor is FailPhase<I, E> => isPhasor(phasor, 'fail');
export const isRerun = <I, T, E>(phasor: Phasor<I, T, E>): phasor is RerunPhase<I, T, E> => isPhasor(phasor, 'rerun');
export const isOngoing = <I, T, E>(phasor: Phasor<I, T, E>): phasor is RunPhase<I> | RerunPhase<I, T, E> => isRun(phasor) || isRerun(phasor);
export const isSettled = <I, T, E>(phasor: Phasor<I, T, E>): phasor is DonePhase<I, T> | FailPhase<I, E> => isDone(phasor) || isFail(phasor);
