import { createActionType } from './helper';

const PAUSE_TIMER = () => {
  return createActionType('pause');
};
const RESET_TIMER = (initialTime: number) => {
  return createActionType('reset', { initialTime });
};

const SET_TIMER = (newTime: number) => {
  return createActionType('set', { newTime });
};

const STOP_TIMER = () => {
  return createActionType('stop');
};

const START_TIMER = () => {
  return createActionType('start');
};

export type TimerActionsType = ReturnType<
  | typeof PAUSE_TIMER
  | typeof RESET_TIMER
  | typeof SET_TIMER
  | typeof STOP_TIMER
  | typeof START_TIMER
>;
