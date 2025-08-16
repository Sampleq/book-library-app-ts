/* в этом одном файле будет вся логика Reducer-а для книг */

import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

import axios from 'axios';

import createBookWithAllFields from '../../utils/createBookWithAllFields';
import { addError } from './errorSlice';
import type { Book, BooksState } from '../../types';
import type { AppDispatch } from '../store';

// Асинхронное действие для получения данных - Создаем асинхронную thunk-функцию - по сути  создаём и экспортируем асинхронный action-creator
export const fetchData = createAsyncThunk<
  Book,
  string,
  {
    dispatch: AppDispatch; // Тип dispatch из  store
    rejectValue: string;
  }
>(
  'books/fetchData', // Префикс для типов действий

  async (url: string, thunkAPI) => {
    try {
      const res = await axios.get(url);

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

      thunkAPI.dispatch(addError((error as Error).message));

      //   throw error; // можно просто пробросить ошибку далее
      return thunkAPI.rejectWithValue((error as Error).message); // или reject и передать значение в payload
    }
  }
);

const initialState: BooksState = {
  books: [],
  isLoadingViaAPI: false,
};

const booksSlice = createSlice({
  initialState,
  name: 'books',

  reducers: {
    addBook: function (state, action: PayloadAction<Book>) {
      state.books.push(action.payload); // immer
    },

    deleteBook: function (state, action: PayloadAction<Book['id']>) {
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    },

    toggleFavoriteBook: function (state, action: PayloadAction<Book['id']>) {
      // immer
      state.books.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite;
        }
      });
    },

    deleteAllBooks: function () {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
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

export const { addBook, deleteBook, toggleFavoriteBook, deleteAllBooks } =
  booksSlice.actions;

export default booksSlice.reducer;
