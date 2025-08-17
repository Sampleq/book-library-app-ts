import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './slices/booksSlice';
import errorReducer from './slices/errorSlice';
import { loadState, saveState } from '@/localStorage';

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    books: booksReducer,
    error: errorReducer,
  },

  preloadedState: preloadedState,
});

store.subscribe(() =>
  saveState({
    books: store.getState().books,
  })
);

export default store;

export type AppDispatch = typeof store.dispatch;

// // Manually define RootState in ./types otherwise get `Error: Type alias 'RootState' circularly references itself` wnen use preloadedState
// export type RootState = ReturnType<typeof store.getState>;
