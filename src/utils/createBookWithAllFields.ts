import { v4 as uuidv4 } from 'uuid';
import type { Book } from '../types';

function createBookWithAllFields(book: Book, source = 'unknown') {
  return {
    ...book,
    // id: Date.now(),
    id: uuidv4(),
    isFavorite: false,
    source,
  };
}

export default createBookWithAllFields;
