import 'jsdom-global/register';
import React from 'react';
import { useTimer } from './useTimer';
import { act } from 'react-dom/test-utils';
import { render, fireEvent } from '@testing-library/react';

jest.useFakeTimers();

describe('Start', () => {
  it('should start timer', () => {
    // Given
    const Component = () => {
      const { time, start } = useTimer();

      return (
        <div>
          <button onClick={start}>Start</button>
          <p data-testid="time">{time}</p>
        </div>
      );
    };

    const { getByRole, getByTestId } = render(<Component />);

    // When
    fireEvent.click(getByRole('button'));

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Then
    expect(getByTestId('time').textContent).toBe('5');
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
          <p data-testid="time">{time}</p>
        </div>
      );
    };

    const { getByRole, getByTestId } = render(<Component />);

    // When
    fireEvent.click(getByRole('button'));

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Then
    expect(getByTestId('time').textContent).toBe('15');
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
          <p data-testid="time">{time}</p>
        </div>
      );
    };

    const { getByRole, getByTestId } = render(<Component />);

    // When
    fireEvent.click(getByRole('button'));

    act(() => {
      jest.advanceTimersByTime(20000);
    });

    // Then
    expect(getByTestId('time').textContent).toBe('80');
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
          <p data-testid="time">{time}</p>
        </div>
      );
    };

    const { getByRole, getByTestId } = render(<Component />);

    // When
    fireEvent.click(getByRole('button'));

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    // Then
    expect(getByTestId('time').textContent).toBe('5');
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
          <p data-testid="time">{time}</p>
        </div>
      );
    };

    const { getByRole, getByTestId } = render(<Component />);

    // When
    fireEvent.click(getByRole('button'));

    act(() => {
      jest.advanceTimersByTime(40000);
    });

    // Then
    expect(getByTestId('time').textContent).toBe('25');
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
          <p data-testid="time">{time}</p>
        </div>
      );
    };

    const { getByRole, getByTestId } = render(<Component />);

    // When
    fireEvent.click(getByRole('button'));

    act(() => {
      jest.advanceTimersByTime(30000);
    });

    // Then
    expect(getByTestId('time').textContent).toBe('10');
  });
});

describe('Pause', () => {
  it('should pause timer', () => {
    // Given
    const Component = () => {
      const { time, start, pause } = useTimer();

      return (
        <div>
          <button data-testid="start" onClick={start}>
            Start
          </button>
          <button data-testid="pause" onClick={pause}>
            Start
          </button>
          <p data-testid="time">{time}</p>
        </div>
      );
    };

    const { getByTestId } = render(<Component />);

    // When
    fireEvent.click(getByTestId('start'));

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    fireEvent.click(getByTestId('pause'));

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Then
    expect(getByTestId('time').textContent).toBe('5');
  });

  it('should pause timer with an end time', () => {
    // Given
    const Component = () => {
      const { time, start, pause } = useTimer({
        endTime: 5,
      });

      return (
        <div>
          <button data-testid="start" onClick={start}>
            Start
          </button>
          <button data-testid="pause" onClick={pause}>
            Start
          </button>
          <p data-testid="time">{time}</p>
        </div>
      );
    };

    const { getByTestId } = render(<Component />);
    const startButton = getByTestId('start');
    const pauseButton = getByTestId('pause');
    const time = getByTestId('time');

    // When
    fireEvent.click(startButton);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    fireEvent.click(pauseButton);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    fireEvent.click(startButton);

    // Then
    expect(time.textContent).toBe('3');

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(time.textContent).toBe('5');
  });
});

describe('Reset', () => {
  it('should reset timer to default initial time', () => {
    // Given
    const Component = () => {
      const { time, start, reset } = useTimer();

      return (
        <div>
          <button data-testid="start" onClick={start}>
            Start
          </button>
          <button data-testid="reset" onClick={reset}>
            Reset
          </button>
          <p data-testid="time">{time}</p>
        </div>
      );
    };

    const { getByTestId } = render(<Component />);
    const startButton = getByTestId('start');
    const resetButton = getByTestId('reset');
    const time = getByTestId('time');

    // When
    fireEvent.click(startButton);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    fireEvent.click(resetButton);

    // Then
    expect(time.textContent).toBe('0');
  });

  it('should reset timer to default initial time after restart', () => {
    // Given
    const Component = () => {
      const { time, start } = useTimer({
        endTime: 10,
      });

      return (
        <div>
          <button onClick={start}>Start</button>
          <p data-testid="time">{time}</p>
        </div>
      );
    };

    const { getByRole, getByTestId } = render(<Component />);

    // When
    fireEvent.click(getByRole('button'));

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    fireEvent.click(getByRole('button'));

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Then
    expect(getByTestId('time').textContent).toBe('5');
  });

  it('should reset timer to initial time of 20', () => {
    // Given
    const Component = () => {
      const { time, start, reset } = useTimer({
        initialTime: 20,
      });

      return (
        <div>
          <button data-testid="start" onClick={start}>
            Start
          </button>
          <button data-testid="reset" onClick={reset}>
            Reset
          </button>
          <p data-testid="time">{time}</p>
        </div>
      );
    };

    const { getByTestId } = render(<Component />);

    // When
    fireEvent.click(getByTestId('start'));

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    fireEvent.click(getByTestId('reset'));

    // Then
    expect(getByTestId('time').textContent).toBe('20');
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
          <button data-testid="start" onClick={start}>
            Start
          </button>
          <button data-testid="pause" onClick={pause}>
            Pause
          </button>
          <button data-testid="reset" onClick={reset}>
            Reset
          </button>
          <p data-testid="status">{isRunning ? 'Running' : 'Not running'}</p>
        </div>
      );
    };

    const { getByTestId } = render(<Component />);
    const startButton = getByTestId('start');
    const pauseButton = getByTestId('pause');
    const resetButton = getByTestId('reset');
    const statusBlock = getByTestId('status');

    // When
    fireEvent.click(startButton);

    // Then
    expect(statusBlock.textContent).toBe('Running');

    // When
    fireEvent.click(pauseButton);

    // Then
    expect(statusBlock.textContent).toBe('Not running');

    // When
    fireEvent.click(startButton);

    // Then
    expect(statusBlock.textContent).toBe('Running');

    // When
    fireEvent.click(resetButton);

    // Then
    expect(statusBlock.textContent).toBe('Not running');
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
          <button onClick={start}>Start</button>
        </div>
      );
    };

    const { getByRole } = render(<Component />);

    // When
    fireEvent.click(getByRole('button'));

    act(() => {
      jest.advanceTimersByTime(30000);
    });

    // Then
    expect(onTimeOver).toHaveBeenCalled();
  });

  it('should call callback function when time is updated', () => {
    // Given
    const onTimeUpdate = jest.fn();
    const Component = () => {
      const { start } = useTimer({
        endTime: 10,
        initialTime: 0,
        onTimeUpdate,
      });

      return (
        <div>
          <button onClick={start}>Start</button>
        </div>
      );
    };

    const { getByRole } = render(<Component />);

    // When
    fireEvent.click(getByRole('button'));

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    // Then
    expect(onTimeUpdate).toHaveBeenCalledTimes(11);
    expect(onTimeUpdate).toHaveBeenNthCalledWith(5, 4);
    expect(onTimeUpdate).toHaveBeenLastCalledWith(10);
  });
});
