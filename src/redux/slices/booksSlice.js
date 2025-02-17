/* в этом одном файле будет вся логика Reducer-а для книг */

import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const booksSlice = createSlice({
  initialState,
  name: 'books',

  reducers: {
    addBook: function (state, action) {
      state.push(action.payload); // immer
    },

    deleteBook: function (state, action) {
      return state.filter(book => book.id !== action.payload);
    },

    toggleFavoriteBook: function (state, action) {
      // immer
      state.forEach(book => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite;
        }
      });
    },
  },
});

export const { addBook, deleteBook, toggleFavoriteBook } = booksSlice.actions;

export function selectBooks(state) {
  return state.books;
}

export default booksSlice.reducer;
