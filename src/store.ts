import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './store/slices/categorySlice';
import cateMealsReducer from './store/slices/cateMealsSlice';

const store = configureStore({
    reducer: {
        categories: categoryReducer,
        meals: cateMealsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;