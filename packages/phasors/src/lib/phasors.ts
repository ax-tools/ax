import {
  EndPhase,
  Ongoing,
  Phase,
  PhasorObject,
  ReadyPhase,
  RerunPhase,
  Resting,
  RunPhase,
} from './phasors.types';

function isIt<I, T, E>(phasor: PhasorObject<I, T, E>, it: Phase) {
  return phasor.phase === it;
}

export const isReady = <I, T, E>(
  phasor: PhasorObject<I, T, E>
): phasor is ReadyPhase => isIt(phasor, Phase.ready);

export const isRunning = <I, T, E>(
  phasor: PhasorObject<I, T, E>
): phasor is RunPhase<I> => isIt(phasor, Phase.run);

export const isEnded = <I, T, E>(
  phasor: PhasorObject<I, T, E>
): phasor is EndPhase<I, T, E> => isIt(phasor, Phase.end);

export const isRerunning = <I, T, E>(
  phasor: PhasorObject<I, T, E>
): phasor is RerunPhase<I, T, E> => isIt(phasor, Phase.rerun);

export const isOngoing = <I, T, E>(
  phasor: PhasorObject<I, T, E>
): phasor is Ongoing<I, T, E> => isRunning(phasor) || isRerunning(phasor);

export const isResting = <I, T, E>(
  phasor: PhasorObject<I, T, E>
): phasor is Resting<I, T, E> => isReady(phasor) || isEnded(phasor);

function ready(): ReadyPhase {
  return { phase: Phase.ready };
}

function run<I>(input: I): RunPhase<I> {
  return { phase: Phase.run, input };
}

function end<I, T, E>(
  input: I,
  result: EndPhase<I, T, E>['result']
): EndPhase<I, T, E> {
  return { phase: Phase.end, input, result };
}

function rerun<I, T, E>(
  input: I,
  lastResult: RerunPhase<I, T, E>['lastResult']
): RerunPhase<I, T, E> {
  return { phase: Phase.rerun, input, lastResult };
}

export const Phasor = {
  ready,
  run,
  end,
  rerun,
};
