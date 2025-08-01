import { INITIAL_QUERY, LocalStorageKey } from '@common/constants.ts';
import { useCallback, useState } from 'react';

type UseSearchQueryResult = {
  query: string;
  setQuery: (value: string) => void;
};

const getPersistedQuery = (): string => {
  return localStorage.getItem(LocalStorageKey.LastQuery) ?? INITIAL_QUERY;
};

export const usePersistedSearchQuery = (): UseSearchQueryResult => {
  const [query, setSearchQuery] = useState(getPersistedQuery());

  const setQuery = useCallback((value: string): void => {
    setSearchQuery(value);
    localStorage.setItem(LocalStorageKey.LastQuery, value);
  }, []);

  return {
    setQuery,
    query,
  };
};
