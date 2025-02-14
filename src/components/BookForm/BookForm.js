import './BookForm.css';

function BookForm() {
  return (
    <div className='app-block book-form'>
      <h2>Add New Book</h2>
      <form>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' />

        <label htmlFor='author'>Author</label>
        <input type='text' id='author' />

        <button type='submit'>Add Book</button>
      </form>
    </div>
  );
}

export default BookForm;
