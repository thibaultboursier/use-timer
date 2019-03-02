import React, { useRef, useState, useEffect } from 'react';

export enum TimerType {
  Decremental = 'DECREMENTAL',
  Incremental = 'INCREMENTAL',
}

export interface IConfig {
  initialTime?: number;
  interval?: number;
  timerType?: TimerType;
}

export interface IValues {
  pause: () => void;
  reset: () => void;
  start: () => void;
  time: number;
}

const initialConfig = {
  initialTime: 0,
  interval: 1000,
  timerType: TimerType.Incremental,
};

export const useTimer = (config?: IConfig): IValues => {
  const { initialTime, interval, timerType } = {
    ...initialConfig,
    ...config
  };
  let intervalRef = useRef<NodeJS.Timeout | null>(null);
  let [time, setTime] = useState(initialTime);

  const cancelTimer = () => {
    if (!intervalRef.current) {
      return;
    }

    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const createTimer = () => {
    intervalRef.current = setInterval(() => {
      const newTime = timerType === TimerType.Incremental ? ++time : --time;

      setTime(newTime);
    }, interval);
  };

  const pause = () => {
    cancelTimer();
  };

  const reset = () => {
    cancelTimer();
    setTime(initialTime);
  };

  const start = () => {
    if (intervalRef.current) {
      return;
    }

    createTimer();
  };

  return { time, start, pause, reset };
};
