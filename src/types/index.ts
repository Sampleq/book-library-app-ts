export interface Book {
  title: string;
  author: string;
  year?: number;
  id?: string;
  isFavorite?: boolean;
  source?: string;
}

export interface BooksState {
  books: Book[];
  isLoadingViaAPI: boolean;
}

export interface FilterState {
  title: string;
  author: string;
  onlyFavorite: boolean;
}

export interface ErrorState {
  errorMessage: string;
  timestamp: null | number;
}

export type RootState = {
  books: BooksState;
  filter: FilterState;
  error: ErrorState;
};
