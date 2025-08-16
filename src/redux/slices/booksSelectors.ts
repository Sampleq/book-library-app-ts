import type { RootState } from '@/types';

export function selectBooks(state: RootState) {
  return state.books.books;
}

export function selectIsLoadingViaAPI(state: RootState) {
  return state.books.isLoadingViaAPI;
}
