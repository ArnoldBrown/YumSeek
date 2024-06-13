import { configureStore } from '@reduxjs/toolkit';
import foodReducer from './features/foodSlice';

const store = configureStore({
  reducer: {
    food: foodReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;