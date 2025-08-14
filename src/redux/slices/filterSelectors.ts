import type { RootState } from '../store';

export function selectTitleFilter(state: RootState) {
  return state.filter.title;
}

export function selectAuthorFilter(state: RootState) {
  return state.filter.author;
}

export function selectOnlyFavorite(state: RootState) {
  return state.filter.onlyFavorite;
}
