import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ErrorState } from '../../types';

const initialState: ErrorState = {
  errorMessage: '',
  timestamp: null,
};

const errorSlice = createSlice({
  initialState,
  name: 'error',

  reducers: {
    addError: function (state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
      state.timestamp = Date.now();
    },

    clearError: function () {
      return initialState;
    },
  },
});

export const { addError, clearError } = errorSlice.actions;

export default errorSlice.reducer;
