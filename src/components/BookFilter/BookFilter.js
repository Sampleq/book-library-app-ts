import './BookFilter.css';

function BookFilter() {
  return (
    <div className='app-block filter'>
      <div className='filter-row '>
        <div className='filter-group'>
          <input type='text' placeholder='Filter by title...' />
        </div>
        <div className='filter-group'>
          <input type='text' placeholder='Filter by author...' />
        </div>
        <div className='filter-group'>
          <label htmlFor='only-favorite'>Only Favorite</label>
          <input type='checkbox' id='only-favorite' />
        </div>
        <button type='reset'>Reset Filters</button>
      </div>
    </div>
  );
}

export default BookFilter;
