import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineStarOutline, MdOutlineStar } from 'react-icons/md';

import './BookList.css';

import { deleteBook, toggleFavoriteBook } from '@/redux/slices/booksSlice';

import { selectBooks } from '@/redux/slices/booksSelectors';

import {
  selectTitleFilter,
  selectAuthorFilter,
  selectOnlyFavorite,
} from '@/redux/slices/filterSelectors';

import type { Book } from '@/types';

function BookList() {
  const books = useSelector(selectBooks);
  const dispatch = useDispatch();

  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavoriteFilter = useSelector(selectOnlyFavorite);

  const booksFiltered =
    !titleFilter && !authorFilter && !onlyFavoriteFilter
      ? books // to save memory when no filters
      : books.filter((book: Book) => {
          const matchTitle = book.title
            .toLowerCase()
            .includes(titleFilter.toLowerCase());

          const matchAuthor = book.author
            .toLowerCase()
            .includes(authorFilter.toLowerCase());

          const matchOnlyFavorite = onlyFavoriteFilter ? book.isFavorite : true;

          return matchTitle && matchAuthor && matchOnlyFavorite;
        });

  function handleDeleteBook(id: Book['id']) {
    dispatch(deleteBook(id));
  }

  function handleToggleFavoriteBook(id: Book['id']) {
    dispatch(toggleFavoriteBook(id));
  }

  function highlightMatchedText(
    text: string,
    search: string,
    cssClass: string = 'highlight'
  ) {
    if (!search) {
      return text;
    }

    const re = new RegExp(`(${search})`, 'ig');
    // console.log(re); // /(the)/gi

    return text.split(re).map((subStr, i) => {
      if (subStr.toLowerCase() === search.toLowerCase()) {
        return (
          <span className={cssClass} key={i}>
            {subStr}
          </span>
        );
      }
      return subStr;
    });
  }

  return (
    <div className='app-block book-list'>
      <h2>Book List</h2>

      {booksFiltered.length === 0 ? (
        <p> No books available</p>
      ) : (
        <ul>
          {booksFiltered.map((book, i) => (
            <li key={book.id}>
              <div className='book-info'>
                {/* {++i}. {book.title} by <b>{book.author}</b> */}
                {++i}.{' '}
                {highlightMatchedText(book.title, titleFilter, 'highlight')} by{' '}
                <b>
                  {highlightMatchedText(book.author, authorFilter, 'highlight')}
                </b>{' '}
                ({book.source})
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
