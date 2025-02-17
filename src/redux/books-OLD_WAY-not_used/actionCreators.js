import * as actionTypes from './actionTypes';

export function addBook(newBook) {
  return {
    type: actionTypes.ADD_BOOK,
    payload: newBook,
  };
}

export function deleteBook(id) {
  return {
    type: actionTypes.DELETE_BOOK,
    payload: id,
  };
}

export function toggleFavoriteBook(id) {
  return {
    type: actionTypes.TOGGLE_FAVORITE_BOOK,
    payload: id,
  };
}
