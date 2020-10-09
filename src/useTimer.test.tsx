import { useTimer } from './useTimer';
import { renderHook, act } from '@testing-library/react-hooks';

jest.useFakeTimers();

describe('Start', () => {
  it('should start timer', () => {
    // Given
    const { result } = renderHook(() => useTimer());

    // When
    act(() => {
      result.current.start();
      jest.advanceTimersByTime(5000);
    });

    // Then
    expect(result.current.time).toBe(5);
  });

  it('should start timer with an initial time of 10', () => {
    // Given
    const { result } = renderHook(() => useTimer({ initialTime: 10 }));

    // When
    act(() => {
      result.current.start();
      jest.advanceTimersByTime(5000);
    });

    // Then
    expect(result.current.time).toBe(15);
  });

  it('should start decremental timer with an initial time of 100', () => {
    // Given
    const { result } = renderHook(() =>
      useTimer({
        initialTime: 100,
        timerType: 'DECREMENTAL',
      })
    );

    // When
    act(() => {
      result.current.start();
      jest.advanceTimersByTime(20000);
    });

    // Then
    expect(result.current.time).toBe(80);
  });

  it('should update time with an interval of 2000 milliseconds', () => {
    // Given
    const { result } = renderHook(() =>
      useTimer({
        interval: 2000,
      })
    );

    // When
    act(() => {
      result.current.start();
      jest.advanceTimersByTime(10000);
    });

    // Then
    expect(result.current.time).toBe(5);
  });
});

describe('Stop', () => {
  it('should stop incremental timer when time is over', () => {
    // Given
    const { result } = renderHook(() =>
      useTimer({
        endTime: 25,
        initialTime: 5,
      })
    );

    // When

    act(() => {
      result.current.start();
      jest.advanceTimersByTime(40000);
    });

    // Then
    expect(result.current.time).toBe(25);
  });

  it('should stop decremental timer when time is over', () => {
    // Given
    const { result } = renderHook(() =>
      useTimer({
        endTime: 10,
        initialTime: 30,
        timerType: 'DECREMENTAL',
      })
    );

    // When
    act(() => {
      result.current.start();
      jest.advanceTimersByTime(30000);
    });

    // Then
    expect(result.current.time).toBe(10);
  });
});

describe('Pause', () => {
  it('should pause timer', () => {
    // Given
    const { result } = renderHook(() => useTimer());

    // When
    act(() => {
      result.current.start();
      jest.advanceTimersByTime(5000);
      result.current.pause();
      jest.advanceTimersByTime(5000);
    });

    // Then
    expect(result.current.time).toBe(5);
  });

  it('should pause timer with an end time', () => {
    // Given
    const { result } = renderHook(() =>
      useTimer({
        endTime: 5,
      })
    );

    // When
    act(() => {
      result.current.start();
      jest.advanceTimersByTime(3000);
      result.current.pause();
      jest.advanceTimersByTime(5000);
      result.current.start();
    });

    // Then
    expect(result.current.time).toBe(3);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(result.current.time).toBe(5);
  });
});

describe('Reset', () => {
  it('should reset timer to default initial time', () => {
    // Given
    const { result } = renderHook(() => useTimer());

    // When
    act(() => {
      result.current.start();
      jest.advanceTimersByTime(5000);
      result.current.reset();
    });

    // Then
    expect(result.current.time).toBe(0);
  });

  it('should reset timer to default initial time after restart', () => {
    // Given
    const { result } = renderHook(() =>
      useTimer({
        endTime: 10,
      })
    );

    // When
    act(() => {
      result.current.start();
      jest.advanceTimersByTime(10000);
      result.current.start();
      jest.advanceTimersByTime(5000);
    });

    // Then
    expect(result.current.time).toBe(5);
  });

  it('should reset timer to initial time of 20', () => {
    // Given
    const { result } = renderHook(() =>
      useTimer({
        initialTime: 20,
      })
    );

    // When
    act(() => {
      result.current.start();
      jest.advanceTimersByTime(5000);
      result.current.reset();
      jest.advanceTimersByTime(5000);
    });

    // Then
    expect(result.current.time).toBe(20);
  });
});

describe('Advance time', () => {
  it('should advance time and add 10 to time value', () => {
    // Given
    const { result } = renderHook(() =>
      useTimer({
        initialTime: 0,
      })
    );

    // When
    act(() => {
      result.current.start();
      jest.advanceTimersByTime(5000);
      result.current.advanceTime(10);
    });

    // Then
    expect(result.current.time).toBe(15);
  });

  it('should advance time and remove 5 to time value when timer type is decremental', () => {
    // Given
    const { result } = renderHook(() =>
      useTimer({
        initialTime: 30,
        timerType: 'DECREMENTAL',
      })
    );

    // When
    act(() => {
      result.current.start();
      jest.advanceTimersByTime(10000);
      result.current.advanceTime(5);
    });

    // Then
    expect(result.current.time).toBe(15);
  });

  it('should continue to update time after it has been advanced', () => {
    // Given
    const { result } = renderHook(() =>
      useTimer({
        initialTime: 0,
      })
    );

    // When
    act(() => {
      result.current.start();
      jest.advanceTimersByTime(10000);
      result.current.advanceTime(50);
      jest.advanceTimersByTime(20000);
    });

    // Then
    expect(result.current.time).toBe(80);
  });
});

describe('State and callbacks', () => {
  it('should display "Running" text when timer is running', () => {
    // Given
    const { result } = renderHook(() =>
      useTimer({
        initialTime: 20,
      })
    );

    // When
    act(() => {
      result.current.start();
    });

    // Then
    expect(result.current.isRunning).toBe(true);

    // When
    act(() => {
      result.current.pause();
    });

    // Then
    expect(result.current.isRunning).toBe(false);

    // When
    act(() => {
      result.current.start();
    });

    // Then
    expect(result.current.isRunning).toBe(true);

    // When
    act(() => {
      result.current.reset();
    });

    // Then
    expect(result.current.isRunning).toBe(false);
  });

  it('should call callback function when time is over', () => {
    // Given
    const onTimeOver = jest.fn();
    const { result } = renderHook(() =>
      useTimer({
        endTime: 30,
        initialTime: 0,
        onTimeOver,
      })
    );

    // When
    act(() => {
      result.current.start();
      jest.advanceTimersByTime(30000);
    });

    // Then
    expect(onTimeOver).toHaveBeenCalledTimes(1);
  });

  it('should call callback function when time is updated', () => {
    // Given
    const onTimeUpdate = jest.fn();
    const { result } = renderHook(() =>
      useTimer({
        endTime: 30,
        initialTime: 0,
        onTimeUpdate,
      })
    );
    // When
    act(() => {
      result.current.start();
      jest.advanceTimersByTime(10000);
    });

    // Then
    expect(onTimeUpdate).toHaveBeenCalledTimes(11);
    expect(onTimeUpdate).toHaveBeenNthCalledWith(5, 4);
    expect(onTimeUpdate).toHaveBeenLastCalledWith(10);
  });
});
