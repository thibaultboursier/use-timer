import { act } from 'react-dom/test-utils';
import { State, Status } from '../types';
import { TimerActionsType } from './actions';

function reducer(state: State, action: TimerActionsType) {
  const paused:Status = 'PAUSED';
  const running:Status = 'RUNNING';
  const stopped:Status = 'STOPPED';
  switch (action.type) {
    case 'advanceTime': {
      const { timeToAdd } = action.payload;

      return {
        ...state,
        time:
          state.timerType === 'DECREMENTAL'
            ? state.time - timeToAdd
            : state.time + timeToAdd,
      };
    }
    case 'pause': {
      return {
        ...state,
        status: paused,
      };
    }
    case 'reset': {
      return {
        ...state,
        status: stopped,
        isTimeOver: false,
        time: action.payload.initialTime,
      };
    }
    case 'set': {
      return {
        ...state,
        time: action.payload.newTime,
      };
    }
    case 'start': {
      return {
        ...state,
        status: running,
      };
    }
    case 'stop': {
      return {
        ...state,
        status: stopped,
        isTimeOver: true,
      };
    }
    default:
      return state;
  }
}

export default reducer;
