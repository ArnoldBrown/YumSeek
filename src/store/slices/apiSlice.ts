import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Category {
    strCategory: string;
}

interface ApiState {
    categories: Category[];
    loading: boolean;
    error: string | null;
}

const initialState: ApiState = {
    categories: [],
    loading: false,
    error: null,
};

export const fetchCategories = createAsyncThunk('api/fetchCategories', async () => {
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    return response.data.meals;
});

const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch categories';
            });
    },
});

export default apiSlice.reducer;