import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FoodState {
  place: string;
  ingredient: string;
  category: string;
}

const initialState: FoodState = {
  place: '',
  ingredient: '',
  category: '',
};

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setPlace(state, action: PayloadAction<string>) {
      state.place = action.payload;
    },
    setIngredient(state, action: PayloadAction<string>) {
      state.ingredient = action.payload;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
  },
});

export const { setPlace, setIngredient, setCategory } = foodSlice.actions;

export default foodSlice.reducer;