import React from 'react';
import { useAppSelector } from './app/hooks';
import './App.css';

import { Gauge } from './features/gauge/Gauge';
import { Controls } from './features/controls/Controls';
import { selectControlState } from './features/controls/controlsSlice';

function App() {
  const state = useAppSelector(selectControlState);
  
  return (
    <div className="App">
      <Gauge
        startAngle={state.startAngle}
        endAngle={state.endAngle}
        startValue={state.startValue}
        endValue={state.endValue}
        stepValue={state.stepValue}
        value={state.value}
        updateInterval={state.updateInterval}/>

      <Controls/>
    </div>
  );
}

export default App;
