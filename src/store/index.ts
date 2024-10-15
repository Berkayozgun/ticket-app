import { configureStore } from '@reduxjs/toolkit';
import tripReducer from '../slices/tripSlice';

const store = configureStore({
  reducer: {
    trip: tripReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
