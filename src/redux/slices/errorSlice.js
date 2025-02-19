import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  errorMessage: '',
  timestamp: null,
};

const errorSlice = createSlice({
  initialState,
  name: 'error',

  reducers: {
    addError: function (state, action) {
      state.errorMessage = action.payload;
      state.timestamp = Date.now();
    },

    clearError: function () {
      return initialState;
    },
  },
});

export const { addError, clearError } = errorSlice.actions;

export const selectError = state => state.error;

export default errorSlice.reducer;
