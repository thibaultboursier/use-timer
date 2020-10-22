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
  shouldAutostart = false,
}: Partial<Config> = {}): ReturnValue => {
  const [state, dispatch] = useReducer(reducer, {
    status: 'STOPPED',
    time: initialTime,
    timerType,
  });

  const { status, time } = state;

  const advanceTime = useCallback((timeToAdd) => {
    dispatch({ type: 'advanceTime', payload: { timeToAdd } });
  }, []);

  const pause = useCallback(() => {
    dispatch({ type: 'pause' });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'reset', payload: { initialTime } });
  }, [initialTime]);

  const start = useCallback(() => {
    dispatch({ type: 'start', payload: { initialTime } });
  }, []);

  useEffect(() => {
    if (shouldAutostart) {
      dispatch({ type: 'start' });
    }
  }, [shouldAutostart]);

  useEffect(() => {
    if (typeof onTimeUpdate === 'function') {
      onTimeUpdate(time);
    }
  }, [time]);

  useEffect(() => {
    if (status !== 'STOPPED' && time === endTime) {
      dispatch({ type: 'stop' });

      if (typeof onTimeOver === 'function') {
        onTimeOver();
      }
    }
  }, [endTime, onTimeOver, time, status]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (status === 'RUNNING') {
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
  }, [status, step, timerType, interval, time]);

  return { advanceTime, status, pause, reset, start, time };
};
