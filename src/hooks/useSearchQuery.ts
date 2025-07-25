import { LS_KEY_LAST_QUERY, SearchParamKey } from '@common/constants.ts';
import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const INITIAL_QUERY = '';

type UseSearchQueryResult = {
  query: string;
  setQuery: (value: string) => void;
};

const getPersisted = (): string => {
  return localStorage.getItem(LS_KEY_LAST_QUERY) ?? INITIAL_QUERY;
};

export const useSearchQuery = (): UseSearchQueryResult => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(getPersisted());

  const setQuery = useCallback(
    (value: string): void => {
      localStorage.setItem(LS_KEY_LAST_QUERY, value);
      searchParams.set(SearchParamKey.Query, value);
      setSearchParams(searchParams);
      setSearchQuery(value);
    },
    [searchParams, setSearchParams],
  );
  return {
    setQuery,
    query: searchQuery,
  };
};
