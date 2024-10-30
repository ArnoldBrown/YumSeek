import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './store/slices/categorySlice';
import cateMealsReducer from './store/slices/cateMealsSlice';
import cartReducer from './store/slices/cartSlice';
import favoritesReducer from './store/slices/favoritesSlice';

const store = configureStore({
    reducer: {
        categories: categoryReducer,
        meals: cateMealsReducer,
        cart: cartReducer,
        favorites: favoritesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;