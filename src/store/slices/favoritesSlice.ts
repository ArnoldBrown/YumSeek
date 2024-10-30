import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the structure of a favorite item
interface FavoriteItem {
  idMeal: string;
  name: string;
  // Other properties as needed
}

// Define the type of the initial state
interface FavoritesState {
  favorites: FavoriteItem[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      const isAlreadyFavorite = state.favorites.some(item => item.idMeal === action.payload.idMeal);
      if (!isAlreadyFavorite) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      state.favorites = state.favorites.filter(item => item.idMeal !== action.payload.idMeal);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
