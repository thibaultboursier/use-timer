import { State } from '../types';
import { TimerActionsType } from './actions';

function reducer(state: State, action: TimerActionsType) {
  switch (action.type) {
    case 'pause': {
      return {
        ...state,
        isRunning: false,
      };
    }
    case 'reset': {
      return {
        ...state,
        isRunning: false,
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
        isRunning: true,
      };
    }
    case 'stop': {
      return {
        ...state,
        isRunning: false,
        isTimeOver: true,
      };
    }
    default:
      return state;
  }
}

export default reducer;
