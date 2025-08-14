import { useDispatch, useSelector } from 'react-redux';
import './BookFilter.css';
import {
  setTitleFilter,
  setAuthorFilter,
  resetFilters,
  toggleOnlyFavorite,
} from '../../redux/slices/filterSlice';

import {
  selectTitleFilter,
  selectAuthorFilter,
  selectOnlyFavorite,
} from '../../redux/slices/filterSelectors';

function BookFilter() {
  const dispatch = useDispatch();

  const titleFilter = useSelector(selectTitleFilter);
  // console.log(titleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavorite = useSelector(selectOnlyFavorite);

  function handleTitleFilterChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setTitleFilter(event.target.value));
  }

  function handleAuthorFilterChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    dispatch(setAuthorFilter(event.target.value));
  }

  function handleToggleOnlyFavorite() {
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
