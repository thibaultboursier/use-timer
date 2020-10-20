export type TimerType = 'DECREMENTAL' | 'INCREMENTAL';

export type Status = 'RUNNING' | 'PAUSED' | 'STOPPED';

export type Config = {
  endTime: number | null;
  initialTime: number;
  interval: number;
  onTimeOver?: () => void;
  onTimeUpdate?: (time: number) => void;
  shouldAutostart: boolean;
  step: number;
  timerType: TimerType;
};

export type ReturnValue = {
  advanceTime: (timeToAdd: number) => void;
  pause: () => void;
  reset: () => void;
  start: () => void;
  status: Status;
  time: number;
};

export interface State {
  status: Status;
  isTimeOver: boolean;
  time: number;
  timerType: TimerType;
}
