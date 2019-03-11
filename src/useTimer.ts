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
  timerType: 'INCREMENTAL',
  step: 1
};

export const useTimer = (config?: Partial<IConfig>): IValues => {
  const { endTime, initialTime, interval, step, timerType } = {
    ...initialConfig,
    ...config
  };
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [time, setTime] = useState(initialTime);

  const cancelTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const createTimeout = () => {
    if (endTime !== null) {
      const delay = Math.abs(endTime - initialTime) * interval;
      setTimeout(cancelTimer, delay);
    }
  };

  const createTimer = () => {
    intervalRef.current = setInterval(() => {
      setTime(previousTime =>
        timerType === 'INCREMENTAL' ? previousTime + step : previousTime - step
      );
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

    if (endTime !== null) {
      createTimeout();
    }
  };

  useEffect(() => cancelTimer, []);

  return { pause, reset, start, time };
};
