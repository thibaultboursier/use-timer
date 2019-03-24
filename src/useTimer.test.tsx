import "jsdom-global/register";
import Enzyme from "enzyme";
import React from "react";
import { useTimer, TimerType } from "./useTimer";
import { act } from "react-dom/test-utils";

jest.useFakeTimers();

it("should start timer", () => {
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
  const button = wrapper.find("button");
  const time = wrapper.find("p");

  button.simulate("click");

  act(() => {
    jest.runTimersToTime(5000);
  });

  expect(time.text()).toBe("5");
});

it("should start timer with an initial time of 10", () => {
  const Component = () => {
    const { time, start } = useTimer({
      initialTime: 10
    });
    return (
      <div>
        <button onClick={start}>Start</button>
        <p>{time}</p>
      </div>
    );
  };
  const wrapper = Enzyme.mount(<Component />);
  const button = wrapper.find("button");
  const time = wrapper.find("p");

  button.simulate("click");

  act(() => {
    jest.runTimersToTime(5000);
  });

  expect(time.text()).toBe("15");
});

it("should start decremental timer with an initial time of 100", () => {
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
  const button = wrapper.find("button");
  const time = wrapper.find("p");

  button.simulate("click");

  act(() => {
    jest.runTimersToTime(20000);
  });

  expect(time.text()).toBe("80");
});

it("should stop incremental timer when end time is reached", () => {
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
  const button = wrapper.find("button");
  const time = wrapper.find("p");

  button.simulate("click");

  act(() => {
    jest.runTimersToTime(40000);
  });

  expect(time.text()).toBe("25");
});

it("should stop decremental timer when end time is reached", () => {
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
  const button = wrapper.find("button");
  const time = wrapper.find("p");

  button.simulate("click");

  act(() => {
    jest.runTimersToTime(30000);
  });

  expect(time.text()).toBe("10");
});

it("should update time with an interval of 2000 milliseconds", () => {
  const Component = () => {
    const { time, start } = useTimer({
      interval: 2000
    });
    return (
      <div>
        <button onClick={start}>Start</button>
        <p>{time}</p>
      </div>
    );
  };
  const wrapper = Enzyme.mount(<Component />);
  const button = wrapper.find("button");
  const time = wrapper.find("p");

  button.simulate("click");

  act(() => {
    jest.runTimersToTime(10000);
  });

  expect(time.text()).toBe("5");
});

it("should pause timer", () => {
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
  const startButton = wrapper.find("#start");
  const pauseButton = wrapper.find("#pause");
  const time = wrapper.find("p");

  startButton.simulate("click");

  act(() => {
    jest.runTimersToTime(5000);
  });

  pauseButton.simulate("click");

  act(() => {
    jest.runTimersToTime(5000);
  });

  expect(time.text()).toBe("5");
});

it("should reset timer to default initial time", () => {
  const Component = () => {
    const { time, start, pause, reset } = useTimer();
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
  const startButton = wrapper.find("#start");
  const resetButton = wrapper.find("#reset");
  const time = wrapper.find("p");

  startButton.simulate("click");

  act(() => {
    jest.runTimersToTime(5000);
  });

  resetButton.simulate("click");

  expect(time.text()).toBe("0");
});

it("should reset timer to default initial time after restart", () => {
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
  const startButton = wrapper.find("#start");
  const time = wrapper.find("p");

  startButton.simulate("click");

  act(() => {
    jest.runTimersToTime(10000);
  });

  startButton.simulate("click");

  act(() => {
    jest.runTimersToTime(5000);
  });

  expect(time.text()).toBe("5");
});

it("should reset timer to initial time of 20", () => {
  const Component = () => {
    const { time, start, pause, reset } = useTimer({
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
  const startButton = wrapper.find("#start");
  const resetButton = wrapper.find("#reset");
  const time = wrapper.find("p");

  startButton.simulate("click");

  act(() => {
    jest.runTimersToTime(5000);
  });

  resetButton.simulate("click");

  expect(time.text()).toBe("20");
});
