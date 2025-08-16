'use client';

import { INITIAL_PAGE } from '@common/constants';
import { FlyoutPanel } from '@components/FlyoutPanel/FlyoutPanel.tsx';
import { SearchBar } from '@components/SearchBar/SearchBar.tsx';

import { SearchResults } from '@components/SearchResults/SearchResults.tsx';
import { useAppCustomSearchParams, usePersistedSearchQuery } from '@hooks/index.ts';
import { useCallback, useEffect, type JSX } from 'react';
import styles from './SearchPage.module.scss';

export const QUERY_PLACEHOLDER = 'Character name...';

export default function SearchPage(): JSX.Element {
  const { query, updateQueryVersion } = usePersistedSearchQuery();
  const { createParams, hasParams } = useAppCustomSearchParams();

  const initSearchParams = useCallback((): void => {
    if (!hasParams('page')) {
      createParams({
        q: query,
        page: INITIAL_PAGE,
      });
    }
  }, [hasParams, createParams, query]);

  useEffect(() => {
    initSearchParams();
  }, [initSearchParams]);

  return (
    <div>
      <div className={styles.wrapper}>
        <SearchBar
          className={styles['search-bar']}
          placeholder={QUERY_PLACEHOLDER}
          onSubmit={updateQueryVersion}
        />
        <SearchResults />
        <FlyoutPanel />
      </div>
    </div>
  );
}
