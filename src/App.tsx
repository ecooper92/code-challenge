import React, { useState } from 'react';
import { Gauge } from './features/gauge/Gauge';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import './App.css';
import { width } from '@mui/system';

function onValueChange(e: any)
{
  console.log(e);
}

function App() {
  const [interval] = useState(200);
  const [value, setValue] = useState(0);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(8);
  const [stepValue, setStepValue] = useState(1);
  const [startValue, setStartValue] = useState(0);
  const [endValue, setEndValue] = useState(8);
  const [startAngle, setStartAngle] = useState(240);
  const [endAngle, setEndAngle] = useState(480);
  const [valueRangeAscending, setValueRangeAscending] = useState(true);

  function SetAngleRange(values: number[])
  {
    setStartAngle(values[0]);
    setEndAngle(values[1]);
  }

  function SetValueRangeAscending(checked: boolean)
  {
    setValueRangeAscending(checked);
    SetValueRange([minValue, maxValue], checked);
  }

  function SetValueRange(values: number[], asc: boolean)
  {
    setMinValue(values[0]);
    setMaxValue(values[1]);
    if (asc)
    {
      setStartValue(values[0]);
      setEndValue(values[1]);
    }
    else
    {
      setStartValue(values[1]);
      setEndValue(values[0]);
    }
  }
  
  return (
    <div className="App">
      <Gauge startAngle={startAngle} endAngle={endAngle} startValue={startValue} endValue={endValue} stepValue={stepValue} value={value} updateInterval={interval}/>

      <div className="control-container">
        <FormControl sx={{m: 1, width:150}} fullWidth={true}>
          <FormLabel><h3>Value</h3></FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Slider min={minValue} max={maxValue} step={0.25} value={value} onChange={(e, v) => setValue(v as number)} />
              }
              label={value} labelPlacement='bottom'/>
          </FormGroup>
        </FormControl>
            
        <FormControl sx={{m: 1, width:150}} fullWidth={true}>
          <FormLabel><h3>Value Range</h3></FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Slider track="inverted" min={-20} max={20} defaultValue={[0, 8]} onChange={(e, v) => SetValueRange((v as number[]), valueRangeAscending)} />
              }
              label={`[${minValue} : ${maxValue}]`} labelPlacement='bottom'/>
            <FormControlLabel
              control={
                <Checkbox checked={valueRangeAscending} onChange={(e, v) => SetValueRangeAscending(v)}/>
              }
              label="Ascending"/>
          </FormGroup>
        </FormControl>

        <FormControl sx={{m: 1, width:150}} fullWidth={true}>
          <FormLabel><h3>Value Step</h3></FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Slider min={1} max={10} step={1} value={stepValue} onChange={(e, v) => setStepValue(v as number)} />
              }
              label={stepValue} labelPlacement='bottom'/>
          </FormGroup>
        </FormControl>
            
        <FormControl sx={{m: 1, width:150}} fullWidth={true}>
          <FormLabel><h3>Angle Range</h3></FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Slider track="inverted" min={180} max={540} defaultValue={[startAngle, endAngle]} onChange={(e, v) => SetAngleRange((v as number[]))} />
              }
              label={`[${startAngle - 180} : ${endAngle - 180}]`} labelPlacement='bottom'/>
          </FormGroup>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
