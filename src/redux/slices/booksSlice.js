/* в этом одном файле будет вся логика Reducer-а для книг */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import createBookWithAllFields from '../../utils/createBookWithAllFields';

// Асинхронное действие для получения данных - Создаем асинхронную thunk-функцию - по сути  создаём и экспортируем асинхронный action-creator
export const fetchData = createAsyncThunk(
  'books/fetchData', // Префикс для типов действий

  async (url, thunkAPI) => {
    try {
      const res = await axios.get(url);

      return res.data; // Возвращаем данные, которые станут значением payload объекта Action
    } catch (error) {
      console.log('catch (error) inside createAsyncThunk() callback');

      //   throw error; // можно просто пробросить ошибку далее
      return thunkAPI.rejectWithValue(error.message); // или reject и передать значение в payload

      //   return thunkAPI.fulfillWithValue({ title: 'Error', author: 'err' }); // just try
    }
  }
);

const initialState = {
  books: [],
  isLoadingViaAPI: false,
};

const booksSlice = createSlice({
  initialState,
  name: 'books',

  reducers: {
    addBook: function (state, action) {
      state.books.push(action.payload); // immer
    },

    deleteBook: function (state, action) {
      return state.books.filter(book => book.id !== action.payload);
    },

    toggleFavoriteBook: function (state, action) {
      // immer
      state.books.forEach(book => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite;
        }
      });
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchData.pending, (state, action) => {
      console.log('fetchData.pending');
    });

    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.books.push(createBookWithAllFields(action.payload, 'API')); // immer
    });

    builder.addCase(fetchData.rejected, (state, action) => {
      console.log('fetchData.rejected');
      console.log(action);
    });
  },
});

export const { addBook, deleteBook, toggleFavoriteBook } = booksSlice.actions;

export function selectBooks(state) {
  return state.books.books;
}

export default booksSlice.reducer;
