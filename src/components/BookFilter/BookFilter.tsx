import './BookFilter.css';

import { useLocation, useNavigate } from 'react-router-dom';
import type { NavigateFunction } from 'react-router-dom';

import queryString from 'query-string';
import type { QueryParams } from '@/types';

function BookFilter() {
  const navigate: NavigateFunction = useNavigate();
  const location = useLocation();

  const parsedSearch: QueryParams = queryString.parse(location.search);
  console.log(parsedSearch);

  // const titleFilter = useSelector(selectTitleFilter);
  const titleFilter: string = parsedSearch.title ?? '';

  const authorFilter: string = parsedSearch.author ?? '';

  const onlyFavorite: boolean = parsedSearch.onlyFavorite === 'true';

  function handleTitleFilterChange(event: React.ChangeEvent<HTMLInputElement>) {
    parsedSearch.title = event.target.value;
    const stringified = queryString.stringify(parsedSearch);

    navigate(`?${stringified}`, { replace: true });
  }

  function handleAuthorFilterChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    parsedSearch.author = event.target.value;
    const stringified = queryString.stringify(parsedSearch);
    console.log(stringified);

    navigate(`?${stringified}`, { replace: true });
  }

  function handleToggleOnlyFavorite() {
    parsedSearch.onlyFavorite = onlyFavorite ? 'false' : 'true';
    const stringified = queryString.stringify(parsedSearch);

    navigate(`?${stringified}`, { replace: true });
  }

  function handleResetFilters() {
    navigate(`.`, { replace: true });
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
