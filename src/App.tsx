import './App.css'
import { useQueryParams } from './hooks/useQueryParams'
// import reactLogo from './assets/react.svg';
import { useState } from 'react'
import React from 'react';
import { useInterval } from './hooks/use-interval';

const Counter: React.FC = () => {
  const [count, setCount] = React.useState<number>(0);

  const incrementCount = (): void => {
    setCount(prevCount => prevCount + 1);
  };

  const { isRunning, delay, startInterval, stopInterval, updateDelay } = useInterval(incrementCount, 1000);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Interval: {delay}ms</p>
      <p>Status: {isRunning ? 'Running' : 'Stopped'}</p>
      <button onClick={startInterval}>Start</button>
      <button onClick={stopInterval}>Stop</button>
      <button onClick={() => updateDelay(500)}>Speed Up (500ms)</button>
      <button onClick={() => updateDelay(2000)}>Slow Down (2000ms)</button>
    </div>
  );
};



function App() {
    const [count, setCount] = useState(0)
    const { get, set } = useQueryParams()
    const handleClick = () => {
        set('page', '2')
    }

    return (
        <>
        <Counter/>
            <div>
                <p>Current page: {get('page') || 'N/A'}</p>
                <button onClick={handleClick}>Go to page 2</button>
            </div>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    {/* <img src={viteLogo} className="logo" alt="Vite logo" /> */}
                </a>
                <a href="https://react.dev" target="_blank">
                    {/* <img src={reactLogo} className="logo react" alt="React logo" /> */}
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
        </>
    )
}

export default App
