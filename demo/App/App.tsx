import React from "react";
import { version } from '../../package.json';
import { useTimer } from '../../src';

// Styles
import "./app.css";

// Shared components
import RunningButton from "./components/RunningButton";

const BasicTimer = () => {
  const { time, start, pause, reset, status } = useTimer();

  return (
    <div className="card">
      <h5 className="card-header">Basic timer</h5>
      <div className="card-body">
        {status === 'RUNNING' ? (
          <RunningButton />
        ) : (
          <button className="btn btn-primary" onClick={start}>
            Start
          </button>
        )}
        <button className="btn btn-primary" onClick={pause}>
          Pause
        </button>
        <button className="btn btn-primary" onClick={reset}>
          Reset
        </button>
      </div>
      <div className="card-footer">
        Elapsed time: <strong>{time}</strong>
      </div>
    </div>
  );
};

const DecrementalTimer = () => {
  const { time, start, pause, reset, status } = useTimer({
    initialTime: 100,
    timerType: "DECREMENTAL"
  });

  return (
    <div className="card">
      <h5 className="card-header">Decremental timer</h5>
      <div className="card-body">
        {status === 'RUNNING' ? (
          <RunningButton />
        ) : (
          <button className="btn btn-primary" onClick={start}>
            Start
          </button>
        )}
        <button className="btn btn-primary" onClick={pause}>
          Pause
        </button>
        <button className="btn btn-primary" onClick={reset}>
          Reset
        </button>
      </div>
      <div className="card-footer">
        Remaining time: <strong>{time}</strong>
      </div>
    </div>
  );
};

const TimerWithEndTime = () => {
  const endTime = 5;
  const { time, start, pause, reset, status } = useTimer({
    endTime,
    onTimeOver: () => {
      console.log('Time is over');
    }
  });

  return (
    <div className="card">
      <h5 className="card-header">Timer with end time</h5>
      <div className="card-body">
        {status === 'RUNNING' ? (
          <RunningButton />
        ) : (
          <button className="btn btn-primary" onClick={start}>
            Start
          </button>
        )}
        <button className="btn btn-primary" onClick={pause}>
          Pause
        </button>
        <button className="btn btn-primary" onClick={reset}>
          Reset
        </button>
      </div>
      <div className="card-footer">
        {time === endTime ? (
          <span>Finished!</span>
        ) : (
          <span>
            Ellapsed time: <strong>{time}</strong>
          </span>
        )}
      </div>
    </div>
  );
};

const TimerWithAdvancedTime = () => {
  const { time, start, pause, reset, advanceTime } = useTimer();

  return (
    <div className="card">
      <h5 className="card-header">Timer with advanced time</h5>
      <div className="card-body">
        <button className="btn btn-primary" onClick={start}>
          Start
        </button>
        <button className="btn btn-primary" onClick={pause}>
          Pause
        </button>
        <button className="btn btn-primary" onClick={reset}>
          Reset
        </button>
        <button className="btn btn-primary" onClick={() => advanceTime(10)}>
          Advance time
        </button>
      </div>
      <div className="card-footer">
        <span>
          Ellapsed time: <strong>{time}</strong>
        </span>
      </div>
    </div>
  );
};

const App = () => (
  <React.Fragment>
    <div className="jumbotron">
      <h1 className="display-4">use-timer demo</h1>
      <p className="lead">Simple timer turned into React Hooks.</p>
      <hr className="my-4" />
      <h2>v{version}</h2>
      <p>
        <a
          href="https://github.com/thibaultboursier/use-timer"
          target="blank"
          title="Link to GitHub project"
        >
          https://github.com/thibaultboursier/use-timer
        </a>
      </p>
    </div>
    <div className="container">
      <BasicTimer />
      <DecrementalTimer />
      <TimerWithEndTime />
      <TimerWithAdvancedTime />
    </div>
  </React.Fragment>
);

export default App;