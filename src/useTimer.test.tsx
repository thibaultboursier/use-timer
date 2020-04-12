import 'jsdom-global/register';
import Enzyme from 'enzyme';
import React from 'react';
import { useTimer } from './useTimer';
import { act } from 'react-dom/test-utils';

jest.useFakeTimers();

describe('Start', () => {
  it('should start timer', () => {
    // Given
    const Component = () => {
      const { time, start } = useTimer();

      return (
        <div>
          <button onClick={start}>Start</button>
          <p>{time}</p>
        </div>
      );
    };

    const wrapper = Enzyme.mount(<Component />);
    const button = wrapper.find('button');
    const time = wrapper.find('p');

    // When
    button.simulate('click');

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Then
    expect(time.text()).toBe('5');
  });

  it('should start timer with an initial time of 10', () => {
    // Given
    const Component = () => {
      const { time, start } = useTimer({
        initialTime: 10,
      });

      return (
        <div>
          <button onClick={start}>Start</button>
          <p>{time}</p>
        </div>
      );
    };

    const wrapper = Enzyme.mount(<Component />);
    const button = wrapper.find('button');
    const time = wrapper.find('p');

    // When
    button.simulate('click');

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Then
    expect(time.text()).toBe('15');
  });

  it('should start decremental timer with an initial time of 100', () => {
    // Given
    const Component = () => {
      const { time, start } = useTimer({
        initialTime: 100,
        timerType: 'DECREMENTAL',
      });

      return (
        <div>
          <button onClick={start}>Start</button>
          <p>{time}</p>
        </div>
      );
    };

    const wrapper = Enzyme.mount(<Component />);
    const button = wrapper.find('button');
    const time = wrapper.find('p');

    // When
    button.simulate('click');

    act(() => {
      jest.advanceTimersByTime(20000);
    });

    // Then
    expect(time.text()).toBe('80');
  });

  it('should update time with an interval of 2000 milliseconds', () => {
    // Given
    const Component = () => {
      const { time, start } = useTimer({
        interval: 2000,
      });

      return (
        <div>
          <button onClick={start}>Start</button>
          <p>{time}</p>
        </div>
      );
    };

    const wrapper = Enzyme.mount(<Component />);
    const button = wrapper.find('button');
    const time = wrapper.find('p');

    // When
    button.simulate('click');

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    // Then
    expect(time.text()).toBe('5');
  });
});

describe('Stop', () => {
  it('should stop incremental timer when time is over', () => {
    // Given
    const Component = () => {
      const { time, start } = useTimer({
        endTime: 25,
        initialTime: 5,
      });

      return (
        <div>
          <button onClick={start}>Start</button>
          <p>{time}</p>
        </div>
      );
    };

    const wrapper = Enzyme.mount(<Component />);
    const button = wrapper.find('button');
    const time = wrapper.find('p');

    // When
    button.simulate('click');

    act(() => {
      jest.advanceTimersByTime(40000);
    });

    // Then
    expect(time.text()).toBe('25');
  });

  it('should stop decremental timer when time is over', () => {
    // Given
    const Component = () => {
      const { time, start } = useTimer({
        endTime: 10,
        initialTime: 30,
        timerType: 'DECREMENTAL',
      });

      return (
        <div>
          <button onClick={start}>Start</button>
          <p>{time}</p>
        </div>
      );
    };

    const wrapper = Enzyme.mount(<Component />);
    const button = wrapper.find('button');
    const time = wrapper.find('p');

    // When
    button.simulate('click');

    act(() => {
      jest.advanceTimersByTime(30000);
    });

    // Then
    expect(time.text()).toBe('10');
  });
});

describe('Pause', () => {
  it('should pause timer', () => {
    // Given
    const Component = () => {
      const { time, start, pause } = useTimer();

      return (
        <div>
          <button id="start" onClick={start}>
            Start
          </button>
          <button id="pause" onClick={pause}>
            Start
          </button>
          <p>{time}</p>
        </div>
      );
    };

    const wrapper = Enzyme.mount(<Component />);
    const startButton = wrapper.find('#start');
    const pauseButton = wrapper.find('#pause');
    const time = wrapper.find('p');

    // When
    startButton.simulate('click');

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    pauseButton.simulate('click');

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Then
    expect(time.text()).toBe('5');
  });

  it('should pause timer with an end time', () => {
    // Given
    const Component = () => {
      const { time, start, pause } = useTimer({
        endTime: 5,
      });

      return (
        <div>
          <button id="start" onClick={start}>
            Start
          </button>
          <button id="pause" onClick={pause}>
            Start
          </button>
          <p>{time}</p>
        </div>
      );
    };

    const wrapper = Enzyme.mount(<Component />);
    const startButton = wrapper.find('#start');
    const pauseButton = wrapper.find('#pause');
    const time = wrapper.find('p');

    // When
    startButton.simulate('click');

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    pauseButton.simulate('click');

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    startButton.simulate('click');

    // Then
    expect(time.text()).toBe('3');

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(time.text()).toBe('5');
  });
});

describe('Reset', () => {
  it('should reset timer to default initial time', () => {
    // Given
    const Component = () => {
      const { time, start, reset } = useTimer();

      return (
        <div>
          <button id="start" onClick={start}>
            Start
          </button>
          <button id="reset" onClick={reset}>
            Reset
          </button>
          <p>{time}</p>
        </div>
      );
    };

    const wrapper = Enzyme.mount(<Component />);
    const startButton = wrapper.find('#start');
    const resetButton = wrapper.find('#reset');
    const time = wrapper.find('p');

    // When
    startButton.simulate('click');

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    resetButton.simulate('click');

    // Then
    expect(time.text()).toBe('0');
  });

  it('should reset timer to default initial time after restart', () => {
    // Given
    const Component = () => {
      const { time, start } = useTimer({
        endTime: 10,
      });

      return (
        <div>
          <button id="start" onClick={start}>
            Start
          </button>
          <p>{time}</p>
        </div>
      );
    };

    const wrapper = Enzyme.mount(<Component />);
    const startButton = wrapper.find('#start');
    const time = wrapper.find('p');

    // When
    startButton.simulate('click');

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    startButton.simulate('click');

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Then
    expect(time.text()).toBe('5');
  });

  it('should reset timer to initial time of 20', () => {
    // Given
    const Component = () => {
      const { time, start, reset } = useTimer({
        initialTime: 20,
      });

      return (
        <div>
          <button id="start" onClick={start}>
            Start
          </button>
          <button id="reset" onClick={reset}>
            Reset
          </button>
          <p>{time}</p>
        </div>
      );
    };

    const wrapper = Enzyme.mount(<Component />);
    const startButton = wrapper.find('#start');
    const resetButton = wrapper.find('#reset');
    const time = wrapper.find('p');

    // When
    startButton.simulate('click');

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    resetButton.simulate('click');

    // Then
    expect(time.text()).toBe('20');
  });
});

describe('State and callbacks', () => {
  it('should display "Running" text when timer is running', () => {
    // Given
    const Component = () => {
      const { isRunning, start, pause, reset } = useTimer({
        initialTime: 20,
      });

      return (
        <div>
          <button id="start" onClick={start}>
            Start
          </button>
          <button id="pause" onClick={pause}>
            Pause
          </button>
          <button id="reset" onClick={reset}>
            Reset
          </button>
          <p>{isRunning ? 'Running' : 'Not running'}</p>
        </div>
      );
    };

    const wrapper = Enzyme.mount(<Component />);
    const startButton = wrapper.find('#start');
    const pauseButton = wrapper.find('#pause');
    const resetButton = wrapper.find('#reset');
    const statusBlock = wrapper.find('p');

    // When
    startButton.simulate('click');

    // Then
    expect(statusBlock.text()).toBe('Running');

    // When
    pauseButton.simulate('click');

    // Expect
    expect(statusBlock.text()).toBe('Not running');

    // When
    startButton.simulate('click');

    // Expect
    expect(statusBlock.text()).toBe('Running');

    // When
    resetButton.simulate('click');

    // Expect
    expect(statusBlock.text()).toBe('Not running');
  });

  it('should call callback function when time is over', () => {
    // Given
    const onTimeOver = jest.fn();
    const Component = () => {
      const { start } = useTimer({
        endTime: 30,
        initialTime: 0,
        onTimeOver,
      });

      return (
        <div>
          <button id="start" onClick={start}>
            Start
          </button>
        </div>
      );
    };

    const wrapper = Enzyme.mount(<Component />);
    const startButton = wrapper.find('#start');

    // When
    startButton.simulate('click');

    act(() => {
      jest.advanceTimersByTime(30000);
    });

    // Then
    expect(onTimeOver).toHaveBeenCalled();
  });
});
