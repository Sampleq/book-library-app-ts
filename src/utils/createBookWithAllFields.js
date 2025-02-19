import { v4 as uuidv4 } from 'uuid';

function createBookWithAllFields(book, source = 'unknown') {
  return {
    ...book,
    // id: Date.now(),
    id: uuidv4(),
    isFavorite: false,
    source,
  };
}

export default createBookWithAllFields;
