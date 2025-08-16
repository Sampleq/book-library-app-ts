import type { RootState } from './types';

const localStorageKey = 'bookLibApp';

export function loadState(): Pick<RootState, 'books'> | undefined {
  try {
    const savedState = localStorage.getItem(localStorageKey);

    if (!savedState) {
      console.log('No saved State in localStorage.');
      return undefined;
    }

    return JSON.parse(savedState);
  } catch (error) {
    console.log((error as Error).message);
    alert((error as Error).message);
  }
}

export function saveState(state: Pick<RootState, 'books'>) {
  try {
    const savedState = JSON.stringify(state);
    localStorage.setItem(localStorageKey, savedState);
  } catch (error) {
    console.log((error as Error).message);
    alert((error as Error).message);
  }
}
