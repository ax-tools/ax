import { Result } from './result.types';

export const enum Phase {
  ready,
  run,
  end,
  rerun,
}

export type ReadyPhase = {
  phase: Phase.ready;
};

export type RunPhase<I> = {
  phase: Phase.run;
  input: I;
};

export type EndPhase<I, T, E> = {
  phase: Phase.end;
  input: I;
  result: Result<T, E>;
};

export type RerunPhase<I, T, E> = {
  phase: Phase.rerun;
  input: I;
  lastResult: Result<T, E>;
};

export type Resting<I, T, E> = ReadyPhase | EndPhase<I, T, E>;
export type Ongoing<I, T, E> = RunPhase<I> | RerunPhase<I, T, E>;

export type Phasor<I, T, E> = Resting<I, T, E> | Ongoing<I, T, E>;
