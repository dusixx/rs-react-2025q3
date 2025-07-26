import { LS_KEY_LAST_QUERY } from '@common/constants.ts';
import { useCallback, useState } from 'react';

export const INITIAL_QUERY = '';

type UseSearchQueryResult = {
  query: string;
  setQuery: (value: string) => void;
};

const getPersistedQuery = (): string => {
  return localStorage.getItem(LS_KEY_LAST_QUERY) ?? INITIAL_QUERY;
};

export const usePersistedSearchQuery = (): UseSearchQueryResult => {
  const [searchQuery, setSearchQuery] = useState(getPersistedQuery());

  const setQuery = useCallback((value: string): void => {
    localStorage.setItem(LS_KEY_LAST_QUERY, value);
    setSearchQuery(value);
  }, []);

  return {
    setQuery,
    query: searchQuery,
  };
};
