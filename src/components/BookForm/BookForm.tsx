import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';

import './BookForm.css';

import { addBook, deleteAllBooks, fetchData } from '@/redux/slices/booksSlice';
import { selectIsLoadingViaAPI } from '@/redux/slices/booksSelectors';

import createBookWithAllFields from '@/utils/createBookWithAllFields';
import booksData from '@/data/books.json'; // при импорте json автоматически конвертируется в объект JavaScript
import { addError } from '@/redux/slices/errorSlice';
import { useAppDispatch } from '@/redux/redux-hook';
import { API_URL } from '@/config';

function BookForm() {
  const [titleText, setTitleText] = useState('');
  const [authorText, setAuthorText] = useState('');

  const dispatch = useAppDispatch();

  const isLoadingViaAPI = useSelector(selectIsLoadingViaAPI);

  function handleAddBookSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // console.log('submit: ', titleText, authorText);

    if (titleText && authorText) {
      const book = {
        title: titleText,
        author: authorText,
      };

      dispatch(addBook(createBookWithAllFields(book, 'manual')));

      setTitleText('');
      setAuthorText('');
    } else {
      dispatch(addError('Fill Author and Title'));
    }
  }

  function handleAddRandomBook() {
    const randomIndex = Math.floor(Math.random() * booksData.length);

    const randomBook = booksData[randomIndex];
    // console.log(randomBook);

    dispatch(addBook(createBookWithAllFields(randomBook, 'random')));
  }

  function handleAddRandomBookViaAPI(url: string) {
    dispatch(fetchData(url));
  }

  function handleDeletAllBooks() {
    dispatch(deleteAllBooks());
  }

  return (
    <div className='app-block book-form'>
      <h2>Add New Book</h2>
      <form onSubmit={handleAddBookSubmit}>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          id='title'
          value={titleText}
          onChange={(e) => setTitleText(e.target.value)}
        />
        <label htmlFor='author'>Author</label>
        <input
          type='text'
          id='author'
          value={authorText}
          onChange={(e) => setAuthorText(e.target.value)}
        />
        <div>
          <button type='submit'>Add Book</button>

          <button type='button' onClick={handleAddRandomBook}>
            Add Random Book
          </button>

          <button
            type='button'
            onClick={() => handleAddRandomBookViaAPI(API_URL)}
            disabled={isLoadingViaAPI}
            style={{ minWidth: '180px' }}
          >
            {isLoadingViaAPI ? (
              <>
                Loading... <FaSpinner className='spinner' />
              </>
            ) : (
              `Add Random Book via API`
            )}
          </button>

          <button
            type='button'
            onClick={() =>
              handleAddRandomBookViaAPI(
                // prompt('Enter API URL', 'http://localhost:4000/random-book')
                prompt(
                  'Enter API URL (type incorrect to see error handling)',
                  'https://dummyjson.com/comments'
                ) ?? ''
              )
            }
            disabled={isLoadingViaAPI}
            style={{ minWidth: '270px' }}
          >
            {isLoadingViaAPI ? (
              <>
                Loading... <FaSpinner className='spinner' />
              </>
            ) : (
              `Add Random Book via API (custom URL)`
            )}
          </button>
        </div>

        <button className='delete' type='button' onClick={handleDeletAllBooks}>
          Delete All Books
        </button>
      </form>
    </div>
  );
}

export default BookForm;
