import React, { useRef, useState, useEffect } from 'react';

export type TimerType = 'DECREMENTAL' | 'INCREMENTAL';

export interface IConfig {
  endTime?: number;
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
  endTime: null,
  initialTime: 0,
  interval: 1000,
  timerType: 'INCREMENTAL',
};

export const useTimer = (config?: IConfig): IValues => {
  const { endTime, initialTime, interval, timerType } = {
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

  const createTimeout = () => {
    if (endTime === null) {
      return;
    }

    const delay = Math.abs(endTime - initialTime) * interval;

    setTimeout(cancelTimer, delay);
  };

  const createTimer = () => {
    intervalRef.current = setInterval(() => {
      setTime(previousTime => {
        return timerType === 'INCREMENTAL' ? ++previousTime : --previousTime;
      });
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
    createTimeout();
  };

  useEffect(() => cancelTimer, []);

  return { time, start, pause, reset };
};
