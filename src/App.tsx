import './App.css';
import BookFilter from './components/BookFilter/BookFilter';
import BookForm from './components/BookForm/BookForm';
import BookList from './components/BookList/BookList';
import Error from './components/Error/Error';

function App() {
  return (
    <div className='app'>
      <header className='app-header'>
        <h1>Book Library App</h1>
      </header>

      <main className='app-main'>
        <section className='app-left-column'>
          <BookForm />
        </section>
        <section className='app-right-column'>
          <BookFilter />
          <BookList />
        </section>
      </main>

      <Error />
    </div>
  );
}

export default App;
