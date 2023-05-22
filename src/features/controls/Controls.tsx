import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import styles from './Controls.module.css';

import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import {
  setValue,
  setValueRange,
  setValueStep,
  setAngleRange,
  setValueRangeAscending,
  selectControlState,
} from './controlsSlice';

export function Controls() {    
    const state = useAppSelector(selectControlState);
    const dispatch = useAppDispatch();
    
    // Render
    return (
      <div className={styles.controlContainer}>
        <div className={styles.controlRow}>
            <FormControl sx={{m: 1, width:150}} fullWidth={true}>
            <FormLabel><h3>Value</h3></FormLabel>
            <FormGroup>
                <FormControlLabel
                control={
                    <Slider min={state.minValue} max={state.maxValue} step={0.25} value={state.value} onChange={(e, v) => dispatch(setValue(v as number))} />
                }
                label={state.value} labelPlacement='bottom'/>
            </FormGroup>
            </FormControl>
                
            <FormControl sx={{m: 1, width:150}} fullWidth={true}>
            <FormLabel><h3>Value Step</h3></FormLabel>
            <FormGroup>
                <FormControlLabel
                control={
                    <Slider min={1} max={10} step={1} value={state.stepValue} onChange={(e, v) => dispatch(setValueStep(v as number))} />
                }
                label={state.stepValue} labelPlacement='bottom'/>
            </FormGroup>
            </FormControl>
        </div>

        <div className={styles.controlRow}>
            <FormControl sx={{m: 1, width:150}} fullWidth={true}>
            <FormLabel><h3>Value Range</h3></FormLabel>
            <FormGroup>
                <FormControlLabel
                control={
                    <Slider track="inverted" min={-20} max={20} defaultValue={[state.minValue, state.maxValue]} onChange={(e, v) => dispatch(setValueRange(v as number[]))} />
                }
                label={`[${state.minValue} : ${state.maxValue}]`} labelPlacement='bottom'/>
                <FormControlLabel
                control={
                    <Checkbox checked={state.ascendingValueRange} onChange={(e, v) => dispatch(setValueRangeAscending(v))}/>
                }
                label="Ascending"/>
            </FormGroup>
            </FormControl>
                
            <FormControl sx={{m: 1, width:150}} fullWidth={true}>
            <FormLabel><h3>Angle Range</h3></FormLabel>
            <FormGroup>
                <FormControlLabel
                control={
                    <Slider track="inverted" min={180} max={540} defaultValue={[state.startAngle, state.endAngle]} onChange={(e, v) => dispatch(setAngleRange(v as number[]))} />
                }
                label={`[${state.startAngle - 180} : ${state.endAngle - 180}]`} labelPlacement='bottom'/>
            </FormGroup>
            </FormControl>
        </div>
      </div>
    );
  }
