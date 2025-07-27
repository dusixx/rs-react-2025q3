import { INITIAL_QUERY, LS_KEY_LAST_QUERY } from '@common/constants.ts';
import { useCallback, useState } from 'react';

type UseSearchQueryResult = {
  query: string;
  setQuery: (value: string) => void;
};

const getPersistedQuery = (): string => {
  return localStorage.getItem(LS_KEY_LAST_QUERY) ?? INITIAL_QUERY;
};

export const usePersistedSearchQuery = (): UseSearchQueryResult => {
  const [query, setSearchQuery] = useState(getPersistedQuery());

  const setQuery = useCallback((value: string): void => {
    setSearchQuery(value);
    localStorage.setItem(LS_KEY_LAST_QUERY, value);
  }, []);

  return {
    setQuery,
    query,
  };
};
