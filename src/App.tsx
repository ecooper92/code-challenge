import React, { useState, useRef, useLayoutEffect } from 'react';
import { Gauge } from './features/gauge/Gauge';
import './App.css';

function App() {
  const [interval] = useState(1000);
  const [value, setValue] = useState(0);
  const valueRef = useRef(value);
  
  useLayoutEffect(() => { valueRef.current = value; }, [value]);
  useLayoutEffect(() => {
    let delta = 8;
    const timer = setInterval(() => {
      setValue(valueRef.current + delta);
      delta = -delta;
    }, interval);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div style={{transform: "scale(0.75)"}}>
          <Gauge startAngle={240} endAngle={480} startValue={0} endValue={8} value={value} updateInterval={interval}/>
        </div>
        <Gauge startAngle={240} endAngle={480} startValue={0} endValue={8} value={value} updateInterval={interval}/>
        <div style={{transform: "scale(0.75)"}}>
          <Gauge startAngle={240} endAngle={480} startValue={8} endValue={0} value={value} updateInterval={interval}/>
        </div>
      </header>
    </div>
  );
}

export default App;
