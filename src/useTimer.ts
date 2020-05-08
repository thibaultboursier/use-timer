import { useEffect, useRef, useState, useCallback } from 'react';

export type TimerType = 'DECREMENTAL' | 'INCREMENTAL';

export interface IConfig {
  endTime: number | null;
  initialTime: number;
  interval: number;
  onTimeOver?: () => void;
  step: number;
  timerType: TimerType;
}

export interface IValues {
  isRunning: boolean;
  pause: () => void;
  reset: () => void;
  start: () => void;
  time: number;
}

export const useTimer = ({
  initialTime = 0,
  interval = 1000,
  step = 1,
  timerType = 'INCREMENTAL',
  endTime,
  onTimeOver,
}: Partial<IConfig> = {}): IValues => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isCountFinished, setIsCountFinished] = useState(false);

  const reset = useCallback(() => {
    setIsRunning(false);
    setIsCountFinished(false);
    setTime(initialTime);
  }, [initialTime]);

  const start = useCallback(() => {
    if (isCountFinished) {
      reset();
    }
    setIsRunning(true);
  }, [reset, isCountFinished]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  useEffect(() => {
    if (isRunning && time === endTime) {
      setIsRunning(false);
      setIsCountFinished(true);
      if (typeof onTimeOver === 'function') {
        onTimeOver();
      }
    }
  }, [endTime, onTimeOver, time, reset, isRunning]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(time =>
          timerType === 'DECREMENTAL' ? time - step : time + step
        );
      }, interval);
    } else if (!isRunning) {
      if (intervalId) clearInterval(intervalId);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning, time, step, timerType, interval]);

  return { reset, start, pause, time, isRunning };
};
