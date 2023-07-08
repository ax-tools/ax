export type Phase = 'ready' | 'run' | 'done' | 'fail' | 'rerun';

export type ReadyPhase = {
  phase: 'ready';
};

export type RunPhase<I> = {
  phase: 'run';
  input: I;
};

export type DonePhase<I, T> = {
  phase: 'done';
  input: I;
  result: T;
};

export type FailPhase<I, E> = {
  phase: 'fail';
  input: I;
  error: E;
};

export type RerunPhase<I, T, E> = {
  phase: 'rerun';
  input: I;
  result?: T;
  error?: E;
};

export type Phasor<I, T, E> =
  | ReadyPhase
  | RunPhase<I>
  | DonePhase<I, T>
  | FailPhase<I, E>
  | RerunPhase<I, T, E>;
