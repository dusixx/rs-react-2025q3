'use client';

import { INITIAL_QUERY, LocalStorageKey } from '@common/constants';
import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useState } from 'react';

type UseSearchQueryResult = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  persistQuery: (value: string) => void;
  updateQueryVersion: () => void;
  getQueryVersion: () => string | null;
  getPersistedQuery: () => string;
};

const _getPersistedQuery = (): string => {
  return localStorage.getItem(LocalStorageKey.LastQuery) ?? INITIAL_QUERY;
};

export const usePersistedSearchQuery = (): UseSearchQueryResult => {
  const [query, setQuery] = useState(_getPersistedQuery());

  const getPersistedQuery = useCallback((): string => {
    return _getPersistedQuery();
  }, []);

  const persistQuery = useCallback((value: string): void => {
    localStorage.setItem(LocalStorageKey.LastQuery, value);
  }, []);

  const getQueryVersion = useCallback((): string | null => {
    return localStorage.getItem(LocalStorageKey.QueryVersion);
  }, []);

  const updateQueryVersion = useCallback((): void => {
    localStorage.setItem(LocalStorageKey.QueryVersion, crypto.randomUUID());
  }, []);

  return {
    setQuery,
    persistQuery,
    query,
    getQueryVersion,
    updateQueryVersion,
    getPersistedQuery,
  };
};
