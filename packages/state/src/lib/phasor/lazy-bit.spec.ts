import { Kind, Phase } from '@ax/phasors';
import { lazyBit } from './lazy-bit';

describe('lazyBit', () => {
  const [init, reducer] = lazyBit(
    (input: string) => Promise.resolve(input),
    'test'
  );

  it('creates a lazy reducer bit', () => {
    expect(init).toEqual(
      expect.objectContaining({ test: { phase: Phase.ready } })
    );
  });

  it('handles trigger action', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => init);

    await reducer(
      getState,
      { type: '://trigger', name: 'test', input: 'a' },
      dispatch
    );

    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: '://set',
      name: 'test',
      phasor: { phase: Phase.run, input: 'a' },
    });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: '://set',
      name: 'test',
      phasor: {
        phase: Phase.end,
        input: 'a',
        result: { status: Kind.Ok, value: 'a' },
      },
    });
  });
});
