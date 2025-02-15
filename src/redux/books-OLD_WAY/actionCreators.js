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
