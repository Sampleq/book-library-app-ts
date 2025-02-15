import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineStarOutline, MdOutlineStar } from 'react-icons/md';

import './BookList.css';
import {
  deleteBook,
  toggleFavoriteBook,
} from '../../redux/books-OLD_WAY/actionCreators';

function BookList() {
  const books = useSelector(state => state.books);
  const dispatch = useDispatch();

  function handleDeleteBook(id) {
    dispatch(deleteBook(id));
  }

  function handleToggleFavoriteBook(id) {
    dispatch(toggleFavoriteBook(id));
  }

  return (
    <div className='app-block book-list'>
      <h2>Book List</h2>

      {books.length === 0 ? (
        <p> No books available</p>
      ) : (
        <ul>
          {books.map((book, i) => (
            <li key={book.id}>
              <div className='book-info'>
                {++i}. {book.title} by <b>{book.author}</b>
              </div>

              <div className='book-actions'>
                <div
                  onClick={() => handleToggleFavoriteBook(book.id)}
                  tabIndex={0}
                >
                  {book.isFavorite ? (
                    <MdOutlineStar className='star-icon' />
                  ) : (
                    <MdOutlineStarOutline className='star-icon' />
                  )}
                </div>
                <button onClick={() => handleDeleteBook(book.id)}>
                  DELETE
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookList;
