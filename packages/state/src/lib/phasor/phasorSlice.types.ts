import { PhasorObject } from '@ax/phasors';

export type PhasorActions<Name, Input extends object> =
  | {
      type: '://rerun';
      name: Name;
      payload: {
        input?: Input;
      };
    }
  | {
      type: '://run';
      name: Name;
      payload: {
        input: Input;
      };
    };

export type PhasorActionsInternal<
  Name,
  Input extends object,
  Output extends object,
> =
  | PhasorActions<Name, Input>
  | {
      type: '://set';
      name: Name;
      payload: PhasorObject<Input, Output>;
    };
