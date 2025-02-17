import { configureStore } from '@reduxjs/toolkit';
// import booksReducer from './books-OLD_WAY/reducer'; // OLD_WAY
import booksReducer from './slices/booksSlice';
import filterReducer from './slices/filterSlice';

const store = configureStore({
  reducer: {
    // books: booksReducer, // OLD_WAY
    books: booksReducer,
    filter: filterReducer,
  },
});

export default store;
