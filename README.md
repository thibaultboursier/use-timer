# use-timer


[![npm Version](https://img.shields.io/npm/v/use-timer.svg)](https://www.npmjs.com/package/use-timer) [![License](https://img.shields.io/npm/l/use-timer.svg)](https://www.npmjs.com/package/use-timer) [![Linux Build Status](https://travis-ci.com/thibaultboursier/use-timer.svg?branch=master)](https://travis-ci.com/thibaultboursier/use-timer)

Simple timer hook for React.

Install it with npm:

```
npm i use-timer --save
```

## Simple timer

```javascript
import React from 'react';
import { useTimer } from 'use-timer';

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
