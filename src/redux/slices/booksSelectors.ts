import type { RootState } from '../store';

export function selectBooks(state: RootState) {
  return state.books.books;
}

export function selectIsLoadingViaAPI(state: RootState) {
  return state.books.isLoadingViaAPI;
}
