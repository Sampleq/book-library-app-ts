import { useDispatch, useSelector } from 'react-redux';
import './BookFilter.css';
import {
  setTitleFilter,
  setAuthorFilter,
  resetFilters,
  selectTitleFilter,
  selectAuthorFilter,
  selectOnlyFavorite,
  toggleOnlyFavorite,
} from '../../redux/slices/filterSlice';

function BookFilter() {
  const dispatch = useDispatch();

  const titleFilter = useSelector(selectTitleFilter);
  // console.log(titleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavorite = useSelector(selectOnlyFavorite);

  function handleTitleFilterChange(event) {
    dispatch(setTitleFilter(event.target.value));
  }

  function handleAuthorFilterChange(event) {
    dispatch(setAuthorFilter(event.target.value));
  }

  function handleToggleOnlyFavorite(event) {
    dispatch(toggleOnlyFavorite());
  }

  function handleResetFilters() {
    dispatch(resetFilters());
  }

  return (
    <div className='app-block filter'>
      <div className='filter-row '>
        <div className='filter-group'>
          <input
            type='text'
            placeholder='Filter by title...'
            value={titleFilter}
            onChange={handleTitleFilterChange}
          />
        </div>
        <div className='filter-group'>
          <input
            type='text'
            placeholder='Filter by author...'
            value={authorFilter}
            onChange={handleAuthorFilterChange}
          />
        </div>
        <div className='filter-group'>
          <label htmlFor='only-favorite'>Only Favorite</label>
          <input
            type='checkbox'
            id='only-favorite'
            checked={onlyFavorite}
            onChange={handleToggleOnlyFavorite}
          />
        </div>
        <button type='reset' onClick={handleResetFilters}>
          Reset Filters
        </button>
      </div>
    </div>
  );
}

export default BookFilter;
