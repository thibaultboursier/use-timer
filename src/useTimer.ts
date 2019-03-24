import { useEffect, useRef, useState } from 'react';

export type TimerType = 'DECREMENTAL' | 'INCREMENTAL';

export interface IConfig {
  endTime: number | null;
  initialTime: number;
  interval: number;
  step: number;
  timerType: TimerType;
}

export interface IValues {
  pause: () => void;
  reset: () => void;
  start: () => void;
  time: number;
}

const initialConfig: IConfig = {
  endTime: null,
  initialTime: 0,
  interval: 1000,
  step: 1,
  timerType: 'INCREMENTAL',
};

export const useTimer = (config?: Partial<IConfig>): IValues => {
  const { endTime, initialTime, interval, step, timerType } = {
    ...initialConfig,
    ...config,
  };
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pausedTimeRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [shouldResetTime, setShouldResetTime] = useState(false);
  const [time, setTime] = useState(initialTime);

  const cancelInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const cancelPausedTime = () => {
    if (pausedTimeRef.current) {
      clearTimeout(pausedTimeRef.current);
      pausedTimeRef.current = null;
    }
  };

  const cancelTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const createInterval = () => {
    intervalRef.current = setInterval(() => {
      setTime(previousTime =>
        timerType === 'INCREMENTAL' ? previousTime + step : previousTime - step
      );
    }, interval);
  };

  const createTimeout = () => {
    if (endTime === null) {
      return;
    }
    
    const delay = Math.abs(endTime - (pausedTimeRef.current || initialTime)) * interval;

    timeoutRef.current = setTimeout(() => {
      cancelInterval();
      setShouldResetTime(true);
    }, delay);
  };

  const pause = () => {
    pausedTimeRef.current = time;

    cancelInterval();
    cancelTimeout();
  };

  const reset = () => {
    cancelInterval();
    cancelPausedTime();
    cancelTimeout();
    resetTime();
  };

  const resetTime = () => {
    setTime(initialTime);
  };

  const start = () => {
    if (intervalRef.current) {
      return;
    }

    if (shouldResetTime) {
      resetTime();
      setShouldResetTime(false);
    }

    createInterval();
    createTimeout();
  };

  useEffect(() => cancelInterval, []);

  return { pause, reset, start, time };
};
