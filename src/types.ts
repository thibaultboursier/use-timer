export type TimerType = 'DECREMENTAL' | 'INCREMENTAL';

export type Config = {
  endTime: number | null;
  initialTime: number;
  interval: number;
  onTimeOver?: () => void;
  step: number;
  timerType: TimerType;
};

export type ReturnValue = {
  isRunning: boolean;
  pause: () => void;
  reset: () => void;
  start: () => void;
  time: number;
};
