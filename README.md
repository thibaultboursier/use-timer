# use-timer

Simple timer hook for React [WORK IN PROGRESS].

Install it with npm:

```
npm i use-timer --save
```

## Simple timer

```javascript
const App = () => {
  const { time, start, pause, reset } = useTimer();

  return (
    <React.Fragment>
      <div>
        <button onClick={start}>Start</button>
        <button onClick={pause}>Pause</button>
        <button onClick={reset}>Reset</button>
      </div>
      <p>Elapsed time: {time}</p>
    </React.Fragment>
  );
};
```
