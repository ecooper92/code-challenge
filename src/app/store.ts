import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import controlsReducer from '../features/controls/controlsSlice';

export const store = configureStore({
  reducer: {
    controls: controlsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
