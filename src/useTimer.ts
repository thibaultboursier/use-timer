import { useCallback, useEffect, useReducer } from 'react';
import { Config, ReturnValue } from './types';
import reducer from './state/reducer';

export const useTimer = ({
  initialTime = 0,
  interval = 1000,
  step = 1,
  timerType = 'INCREMENTAL',
  endTime,
  onTimeOver,
  onTimeUpdate,
}: Partial<Config> = {}): ReturnValue => {
  const [state, dispatch] = useReducer(reducer, {
    isRunning: false,
    isTimeOver: false,
    time: initialTime,
  });

  const { isRunning, isTimeOver, time } = state;

  const reset = useCallback(() => {
    dispatch({ type: 'reset', payload: { initialTime } });
  }, [initialTime]);

  const start = useCallback(() => {
    if (isTimeOver) {
      reset();
    }

    dispatch({ type: 'start' });
  }, [reset, isTimeOver]);

  const pause = useCallback(() => {
    dispatch({ type: 'pause' });
  }, []);

  useEffect(() => {
    if (typeof onTimeUpdate === 'function') {
      onTimeUpdate(time);
    }
  }, [time]);

  useEffect(() => {
    if (isRunning && time === endTime) {
      dispatch({ type: 'stop' });

      if (typeof onTimeOver === 'function') {
        onTimeOver();
      }
    }
  }, [endTime, onTimeOver, time, isRunning]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isRunning) {
      intervalId = setInterval(() => {
        dispatch({
          type: 'set',
          payload: {
            newTime: timerType === 'DECREMENTAL' ? time - step : time + step,
          },
        });
      }, interval);
    } else if (intervalId) {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, step, timerType, interval, time]);

  return { isRunning, pause, reset, start, time };
};
