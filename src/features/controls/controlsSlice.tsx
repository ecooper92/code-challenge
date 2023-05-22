import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface ControlsState {
  ascendingValueRange: boolean;
  minValue: number;
  maxValue: number;
  startValue: number;
  endValue: number;
  stepValue: number;
  value: number;
  startAngle: number;
  endAngle: number;
  updateInterval: number;
}

const initialState: ControlsState = {
  ascendingValueRange: true,
  minValue: 0,
  maxValue: 8,
  startValue: 0,
  endValue: 8,
  stepValue: 1,
  value: 0,
  startAngle: 240,
  endAngle: 480,
  updateInterval: 200
};

function UpdateValueRange(state: ControlsState, values: number[])
{
  state.minValue = values[0];
  state.maxValue = values[1];

  if (state.ascendingValueRange)
  {
    state.startValue = values[0];
    state.endValue = values[1];
  }
  else
  {
    state.startValue = values[1];
    state.endValue = values[0];
  }
}

export const controlsSlice = createSlice({
  name: 'controls',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    setValueRange: (state, action: PayloadAction<number[]>) => {
      UpdateValueRange(state, action.payload);
    },
    setValueStep: (state, action: PayloadAction<number>) => {
      state.stepValue = action.payload;
    },
    setAngleRange: (state, action: PayloadAction<number[]>) => {
      state.startAngle = action.payload[0];
      state.endAngle = action.payload[1];
    },
    setValueRangeAscending: (state, action: PayloadAction<boolean>) => {
      state.ascendingValueRange = action.payload;
      UpdateValueRange(state, [state.minValue, state.maxValue]);
    },
  }
});

export const { setValue, setValueRange, setValueStep, setAngleRange, setValueRangeAscending } = controlsSlice.actions;
export const selectControlState = (state: RootState) => state.controls;
export default controlsSlice.reducer;