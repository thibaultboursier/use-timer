import React, { useRef, useState } from 'react';

interface IConfig {
  initialTime?: number;
  interval?: number;
}

interface IValues {
  pause: () => void;
  reset: () => void;
  start: () => void;
  time: number;
}

const initialConfig = {
  initialTime: 0,
  interval: 1000
};

export const useTimer = (config?: IConfig): IValues => {
  const { initialTime, interval } = {
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
      setTime(++time);
    }, interval);
  };

  const pause = () => {
    cancelTimer();
  };

  const reset = () => {
    cancelTimer();
    setTime(0);
  };

  const start = () => {
    if (intervalRef.current) {
      return;
    }

    createTimer();
  };

  return { time, start, reset, pause };
};
