import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';

import './BookForm.css';

// import { addBook } from '../../redux/books-OLD_WAY/actionCreators'; // OLD_WAY
import {
  addBook,
  fetchData,
  selectIsLoadingViaAPI,
} from '../../redux/slices/booksSlice';

import createBookWithAllFields from '../../utils/createBookWithAllFields';
import booksData from '../../data/books.json'; // при импорте json автоматически конвертируется в объект JavaScript
import { addError } from '../../redux/slices/errorSlice';

// // for backend: http://localhost:4000/random-book (returns json of random book like {"title": "Things Fall Apart", "author": "Chinua Achebe"})
// const API_URL = 'http://localhost:4000/random-book';
const API_URL = 'https://dummyjson.com/comments';

function BookForm() {
  const [titleText, setTitleText] = useState('');
  const [authorText, setAuthorText] = useState('');

  const dispatch = useDispatch();

  const isLoadingViaAPI = useSelector(selectIsLoadingViaAPI);

  function handleAddBookSubmit(e) {
    e.preventDefault();
    // console.log('submit: ', titleText, authorText);

    // dispatch action
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

  function handleAddRandomBookViaAPI(url) {
    dispatch(fetchData(url));
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
          onChange={e => setTitleText(e.target.value)}
        />

        <label htmlFor='author'>Author</label>
        <input
          type='text'
          id='author'
          value={authorText}
          onChange={e => setAuthorText(e.target.value)}
        />

        <button
          type='submit'
          //  onClick={handleAddBookSubmit} - must process form onSubmit={..} !!
        >
          Add Book
        </button>

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
              )
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
      </form>
    </div>
  );
}

export default BookForm;
