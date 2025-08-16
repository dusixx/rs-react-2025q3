/* eslint-disable no-empty */
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

const setItem = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch {}
};
const getItem = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};
const _getPersistedQuery = (): string => {
  return getItem(LocalStorageKey.LastQuery) ?? INITIAL_QUERY;
};

export const usePersistedSearchQuery = (): UseSearchQueryResult => {
  const [query, setQuery] = useState(_getPersistedQuery());

  const getPersistedQuery = useCallback((): string => {
    return _getPersistedQuery();
  }, []);

  const persistQuery = useCallback((value: string): void => {
    setItem(LocalStorageKey.LastQuery, value);
  }, []);

  const getQueryVersion = useCallback((): string | null => {
    return getItem(LocalStorageKey.QueryVersion);
  }, []);

  const updateQueryVersion = useCallback((): void => {
    setItem(LocalStorageKey.QueryVersion, crypto.randomUUID());
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
