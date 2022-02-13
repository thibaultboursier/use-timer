import { useCallback, useEffect, useReducer } from 'react';
import { Config, ReturnValue } from './types';
import reducer from './state/reducer';

export const useTimer = ({
  autostart = false,
  endTime,
  initialStatus = 'STOPPED',
  initialTime = 0,
  interval = 1000,
  onTimeOver,
  onTimeUpdate,
  step = 1,
  timerType = 'INCREMENTAL',
}: Partial<Config> = {}): ReturnValue => {
  const [state, dispatch] = useReducer(reducer, {
    status: initialStatus,
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
  }, [initialTime]);

  useEffect(() => {
    if (autostart) {
      dispatch({ type: 'start', payload: { initialTime } });
    }
  }, [autostart, initialTime]);

  useEffect(() => {
    if (typeof onTimeUpdate === 'function') {
      onTimeUpdate(time);
    }
  }, [time, onTimeUpdate]);

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

  return { advanceTime, pause, reset, start, status, time };
};
