import { TimerActionsType } from './actions';
import { State } from './types';

function Reducer(state: State, action: TimerActionsType) {
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
    case 'stop': {
      return {
        ...state,
        isRunning: false,
        isTimeOver: true,
      };
    }
    case 'start': {
      return {
        ...state,
        isRunning: true,
      };
    }
    default:
      return state;
  }
}

export default Reducer;
