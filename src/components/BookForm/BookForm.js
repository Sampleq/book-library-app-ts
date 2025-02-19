import { useState } from 'react';
import { useDispatch } from 'react-redux';

import './BookForm.css';

// import { addBook } from '../../redux/books-OLD_WAY/actionCreators'; // OLD_WAY
import { addBook, fetchData } from '../../redux/slices/booksSlice';

import createBookWithAllFields from '../../utils/createBookWithAllFields';
import booksData from '../../data/books.json'; // при импорте json автоматически конвертируется в объект JavaScript

function BookForm() {
  const [titleText, setTitleText] = useState('');
  const [authorText, setAuthorText] = useState('');

  const dispatch = useDispatch();

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
    }
  }

  function handleAddRandomBook() {
    const randomIndex = Math.floor(Math.random() * booksData.length);

    const randomBook = booksData[randomIndex];
    // console.log(randomBook);

    dispatch(addBook(createBookWithAllFields(randomBook, 'random')));
  }

  function handleAddRandomBookViaAPI() {
    dispatch(fetchData('http://localhost:4000'));
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

        <button type='button' onClick={handleAddRandomBookViaAPI}>
          Add Random Book via API
        </button>
      </form>
    </div>
  );
}

export default BookForm;
