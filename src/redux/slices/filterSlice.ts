import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FilterState } from '../../types';

const initialState: FilterState = {
  title: '',
  author: '',
  onlyFavorite: false,
};

const filterSlice = createSlice({
  initialState,
  name: 'filter',
  reducers: {
    setTitleFilter: function (state, action: PayloadAction<string>) {
      state.title = action.payload; // immer
    },

    setAuthorFilter: function (state, action: PayloadAction<string>) {
      state.author = action.payload; // immer
    },

    toggleOnlyFavorite: function (state) {
      state.onlyFavorite = !state.onlyFavorite; // immer
    },

    resetFilters: function () {
      return initialState;
    },
  },
});

// экспортируем функции action-creators
export const {
  setTitleFilter,
  setAuthorFilter,
  toggleOnlyFavorite,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
