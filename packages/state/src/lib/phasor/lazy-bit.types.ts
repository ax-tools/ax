import { PhasorObject } from '@ax/phasors';

export type Fetcher<I, D> = (input: I) => Promise<D>;

export type InternalActions<I, D, E, N> = {
  type: '://set';
  name: N;
  phasor: PhasorObject<I, D, E>;
};

export type Actions<I, N> = {
  type: '://trigger';
  name: N;
  input: I;
};

export type StateBit<I, D, E, N extends string> = {
  [key in N]: PhasorObject<I, D, E>;
};
