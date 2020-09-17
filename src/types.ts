export type TimerType = 'DECREMENTAL' | 'INCREMENTAL';

export type Config = {
  endTime: number | null;
  initialTime: number;
  interval: number;
  onTimeOver?: () => void;
  onTimeUpdate?: (time: number) => void;
  step: number;
  timerType: TimerType;
};

export type ReturnValue = {
  advanceTime: (timeToAdd: number) => void;
  isRunning: boolean;
  pause: () => void;
  reset: () => void;
  start: () => void;
  time: number;
};

export interface State {
  isRunning: boolean;
  isTimeOver: boolean;
  time: number;
  timerType: TimerType;
}
