import { v4 as uuidv4 } from 'uuid';

function createBookWithAllFields(book) {
  return {
    ...book,
    // id: Date.now(),
    id: uuidv4(),
    isFavorite: false,
  };
}

export default createBookWithAllFields;
