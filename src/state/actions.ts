import { createActionType } from './helpers';

const PAUSE_TIMER = () => createActionType('pause');

const RESET_TIMER = (initialTime: number) =>
  createActionType('reset', { initialTime });

const SET_TIMER = (newTime: number) => createActionType('set', { newTime });

const START_TIMER = () => createActionType('start');

const STOP_TIMER = () => createActionType('stop');

export type TimerActionsType = ReturnType<
  | typeof PAUSE_TIMER
  | typeof RESET_TIMER
  | typeof SET_TIMER
  | typeof START_TIMER
  | typeof STOP_TIMER
>;
