import { INITIAL_PAGE } from '@common/constants.ts';
import { SearchBar } from '@components/SearchBar/SearchBar.tsx';
import { SearchResults } from '@components/SearchResults/SearchResults.tsx';
import { useCustomSearchParams } from '@hooks/useCustomSearchParams.ts';
import { usePersistedSearchQuery } from '@hooks/usePersistedSearchQuery';
import { useEffect, useState, type JSX } from 'react';
import { TestId } from 'src/test-utils/constants.ts';
import styles from './SearchPage.module.scss';

export const QUERY_PLACEHOLDER = 'Character name...';

export default function SearchPage(): JSX.Element {
  const { query, setQuery } = usePersistedSearchQuery();
  const [page, setPage] = useState(INITIAL_PAGE);
  const [value, setValue] = useState(query);
  const [version, setVersion] = useState(crypto.randomUUID());
  const { getParams, createParams, deleteParams, hasParams } = useCustomSearchParams();

  useEffect(() => {
    if (!hasParams('page')) {
      createParams({
        q: query,
        page: INITIAL_PAGE.toString(),
      });
    }
    const [q = query, p = INITIAL_PAGE] = getParams('q', 'page');
    setQuery(q);
    setValue(q);
    setPage(Number(p));
  }, [getParams, setQuery, setValue, deleteParams, hasParams, createParams, query]);

  const handleSubmit = (value: string): void => {
    createParams({ q: value, page: INITIAL_PAGE.toString() });
    if (page === INITIAL_PAGE && value === query) {
      setVersion(crypto.randomUUID());
    }
  };
  const handleChange = (value: string): void => {
    setValue(value);
    if (!value) {
      handleSubmit(value);
    }
  };
  return (
    <div data-testid={TestId.SearchPage}>
      <div className={styles.wrapper}>
        <SearchBar
          className={styles.searchBar}
          placeholder={QUERY_PLACEHOLDER}
          onSubmit={handleSubmit}
          onChange={handleChange}
          value={value}
        />
        <SearchResults query={query} page={page} version={version} />
      </div>
    </div>
  );
}
