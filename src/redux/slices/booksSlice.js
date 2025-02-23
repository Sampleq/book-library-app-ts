/* в этом одном файле будет вся логика Reducer-а для книг */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import createBookWithAllFields from '../../utils/createBookWithAllFields';
import { addError } from './errorSlice';

// Асинхронное действие для получения данных - Создаем асинхронную thunk-функцию - по сути  создаём и экспортируем асинхронный action-creator
export const fetchData = createAsyncThunk(
  'books/fetchData', // Префикс для типов действий

  async (url, thunkAPI) => {
    // console.log(url, thunkAPI);

    try {
      const res = await axios.get(url);

      // // for backend: http://localhost:4000/random-book (returns json of random book like {"title": "Things Fall Apart", "author": "Chinua Achebe"})
      // return res.data; // Возвращаем данные, которые станут значением payload объекта Action

      // // for backend: https://dummyjson.com/comments
      const comments = res.data.comments;
      const randomIndex = Math.floor(Math.random() * comments.length);
      const randomComment = comments[randomIndex];

      const randomBookFromComment = {
        author: randomComment.user.fullName,
        title: randomComment.body,
      };

      return randomBookFromComment;
    } catch (error) {
      console.log('catch (error) inside createAsyncThunk() callback');

      //  console.log( thunkAPI.getState() ); // читаем состояние
      thunkAPI.dispatch(addError(error.message)); // записываем ошибку в Состояние

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
      return {
        ...state,
        books: state.books.filter(book => book.id !== action.payload),
      };
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
      state.isLoadingViaAPI = true;
    });

    builder.addCase(fetchData.fulfilled, (state, action) => {
      console.log('fetchData.fulfilled');
      state.books.push(createBookWithAllFields(action.payload, 'API')); // immer

      state.isLoadingViaAPI = false;
    });

    builder.addCase(fetchData.rejected, (state, action) => {
      console.log('fetchData.rejected');
      console.log(action);

      state.isLoadingViaAPI = false;
    });
  },
});

export const { addBook, deleteBook, toggleFavoriteBook } = booksSlice.actions;

export function selectBooks(state) {
  return state.books.books;
}

export function selectIsLoadingViaAPI(state) {
  return state.books.isLoadingViaAPI;
}

export default booksSlice.reducer;
