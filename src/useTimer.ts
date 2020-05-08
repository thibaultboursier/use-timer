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
  const [isTimeOver, setIsTimeOver] = useState(false);

  const reset = useCallback(() => {
    setIsRunning(false);
    setIsTimeOver(false);
    setTime(initialTime);
  }, [initialTime]);

  const start = useCallback(() => {
    if (isTimeOver) {
      reset();
    }
    setIsRunning(true);
  }, [reset, isTimeOver]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  useEffect(() => {
    if (isRunning && time === endTime) {
      setIsRunning(false);
      setIsTimeOver(true);
      if (typeof onTimeOver === 'function') {
        onTimeOver();
      }
    }
  }, [endTime, onTimeOver, time, isRunning]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(time =>
          timerType === 'DECREMENTAL' ? time - step : time + step
        );
      }, interval);
    } else {
      if (intervalId) clearInterval(intervalId);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning, step, timerType, interval]);

  return { reset, start, pause, time, isRunning };
};
