# ⏱️ use-timer

[![npm Version](https://img.shields.io/npm/v/use-timer.svg)](https://www.npmjs.com/package/use-timer) [![License](https://img.shields.io/npm/l/use-timer.svg)](https://www.npmjs.com/package/use-timer) [![Linux Build Status](https://travis-ci.com/thibaultboursier/use-timer.svg?branch=master)](https://travis-ci.com/thibaultboursier/use-timer) [![Bundle size](https://badgen.net/bundlephobia/min/use-timer?label=size)](https://bundlephobia.com/result?p=use-timer) [![Bundle size](https://badgen.net/bundlephobia/minzip/use-timer?label=gzip%20size)](https://bundlephobia.com/result?p=use-timer)

Simple timer turned into React Hooks.
Read about [Hooks](https://reactjs.org/docs/hooks-intro.html) feature.

## Installation

```
npm i use-timer
```

With [Yarn](https://yarnpkg.com/):

```
yarn add use-timer
```

## Demo

[![Netlify Status](https://api.netlify.com/api/v1/badges/3be3466e-4bc9-46f1-89b0-9b09910cc20b/deploy-status)](https://app.netlify.com/sites/use-timer/deploys)

🚀 Try last production version on Netlify!

https://use-timer.netlify.app/

## Usage

### Basic timer

```tsx
import React from 'react';
import { useTimer } from 'use-timer';

const App = () => {
  const { time, start, pause, reset, status } = useTimer();

  return (
    <>
      <div>
        <button onClick={start}>Start</button>
        <button onClick={pause}>Pause</button>
        <button onClick={reset}>Reset</button>
      </div>
      <p>Elapsed time: {time}</p>
      {status === 'RUNNING' && <p>Running...</p>}
    </>
  );
};
```

### Decremental timer

```tsx
const { time, start, pause, reset, status } = useTimer({
  initialTime: 100,
  timerType: 'DECREMENTAL',
});
```

### Timer with end time

```tsx
const { time, start, pause, reset, status } = useTimer({
  endTime: 30,
  initialTime: 10,
});
```

### Advance time

This works for all types of timer (incremental and decremental).

```tsx
const { time, start, advanceTime } = useTimer({
  initialTime: 20,
});

start();
advanceTime(10);

console.log(time); // 30
```

## Callbacks

Some callback functions can be provided.

### When time is over

```tsx
const { time, start, pause, reset, status } = useTimer({
  endTime,
  onTimeOver: () => {
    console.log('Time is over');
  },
});
```

### When time is updated

```tsx
const { time, start, pause, reset, status } = useTimer({
  endTime,
  onTimeUpdate: (time) => {
    console.log('Time is updated', time);
  },
});
```

## Configuration

The configuration and all its parameters are optional.

| Property     | Type     | Default value | Description                                                                            |
| ------------ | -------- | ------------- | -------------------------------------------------------------------------------------- |
| autostart    | boolean  | false         | Pass true to start timer automatically                                                 |
| endTime      | number   | null          | The value for which timer stops                                                        |
| initialTime  | number   | 0             | The starting value for the timer                                                       |
| interval     | number   | 1000          | The interval in milliseconds                                                           |
| onTimeOver   | function |               | Callback function that is called when time is over                                     |
| onTimeUpdate | function |               | Callback function that is called when time is updated                                  |
| step         | number   | 1             | The value to add to each increment / decrement                                         |
| timerType    | string   | "INCREMENTAL" | The choice between a value that increases ("INCREMENTAL") or decreases ("DECREMENTAL") |
