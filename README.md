# use-timer

[![npm Version](https://img.shields.io/npm/v/use-timer.svg)](https://www.npmjs.com/package/use-timer) [![License](https://img.shields.io/npm/l/use-timer.svg)](https://www.npmjs.com/package/use-timer) [![Linux Build Status](https://travis-ci.com/thibaultboursier/use-timer.svg?branch=master)](https://travis-ci.com/thibaultboursier/use-timer) [![Bundle size](https://badgen.net/bundlephobia/min/use-timer?label=size)](https://bundlephobia.com/result?p=use-timer) [![Bundle size](https://badgen.net/bundlephobia/minzip/use-timer?label=gzip%20size)](https://bundlephobia.com/result?p=use-timer)

Simple timer turned into React Hooks.
Read about [Hooks](https://reactjs.org/docs/hooks-intro.html) feature.

## Installation

```
npm i use-timer --save
```

## Examples

Try demo here: [https://stackblitz.com/edit/use-timer](https://stackblitz.com/edit/use-timer).

## Usage

### Basic timer

```javascript
import React from 'react';
import { useTimer } from 'use-timer';

const App = () => {
  const { time, start, pause, reset, isRunning } = useTimer();

  return (
    <>
      <div>
        <button onClick={start}>Start</button>
        <button onClick={pause}>Pause</button>
        <button onClick={reset}>Reset</button>
      </div>
      <p>Elapsed time: {time}</p>
      {isRunning && <p>Running...</p>}
    </>
  );
};
```

### Decremental timer

```javascript
const { time, start, pause, reset, isRunning } = useTimer({
  initialTime: 100,
  timerType: 'DECREMENTAL',
});
```

### Timer with end time

```javascript
const { time, start, pause, reset, isRunning } = useTimer({
  endTime: 30,
  initialTime: 10,
});
```

## Configuration

The configuration and all its parameters are optional.

| Property    | Type     | Default value | Description                                                                            |
| ----------- | -------- | ------------- | -------------------------------------------------------------------------------------- |
| endTime     | number   | null          | the value for which timer stops                                                        |
| initialTime | number   | 0             | the starting value for the timer                                                       |
| interval    | number   | 1000          | the interval in milliseconds                                                           |
| onTimeOver  | function |               | callback function that is called when time is over                                     |
| step        | number   | 1             | the value to add to each increment / decrement                                         |
| timerType   | string   | "INCREMENTAL" | the choice between a value that increases ("INCREMENTAL") or decreases ("DECREMENTAL") |
