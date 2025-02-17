import * as actionTypes from './actionTypes';

const initialState = [];

function booksReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_BOOK:
      return [...state, action.payload];

    case actionTypes.DELETE_BOOK:
      return state.filter(book => book.id !== action.payload);

    case actionTypes.TOGGLE_FAVORITE_BOOK:
      return state.map(book => {
        if (book.id === action.payload) {
          return {
            ...book,
            isFavorite: !book.isFavorite,
          };
        }

        return book;
        // return { ...book }; // IMHO no needed and less memory using
      });

    default:
      return state;
  }
}

export default booksReducer;
