import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFoodByCategory } from '../../network/apiService';

interface Meal {
    idMeal: string;
    price: string;
    strMeal: string;
    strMealThumb: string;
}

interface MealsState {
    meals: Meal[];
    loadingM: boolean;
    errorM: string | null;
}

const initialState: MealsState = {
    meals: [],
    loadingM: false,
    errorM: null,
};

export const getMealsByCategory = createAsyncThunk('meals/getMealsByCategory', async (category: string) => {
    return await getFoodByCategory(category);
});

const cateMealsSlice = createSlice({
    name: 'meals',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMealsByCategory.pending, (state) => {
                state.loadingM = true;
                state.errorM = null;
            })
            .addCase(getMealsByCategory.fulfilled, (state, action) => {
                state.loadingM = false;
                // state.meals = action.payload;
                state.meals = action.payload.map((meal: Meal) => ({
                    ...meal,
                    price: Math.floor(Math.random() * 20) + 5, // Random price between 5 and 25
                }));
            })
            .addCase(getMealsByCategory.rejected, (state, action) => {
                state.loadingM = false;
                state.errorM = action.error.message || 'Failed to fetch meals';
            });
    },
});

export default cateMealsSlice.reducer;