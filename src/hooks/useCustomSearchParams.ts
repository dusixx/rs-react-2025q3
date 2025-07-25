import type { SearchParamKey } from '@common/constants.ts';
import { useCallback } from 'react';
import type { SetURLSearchParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

export type SearchParamValue = (typeof SearchParamKey)[keyof typeof SearchParamKey];

type UseCustomSearchParamsResult = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  setParam: (key: SearchParamValue, value: string) => void;
  getParam: (key: SearchParamValue) => string;
  deleteParam: (key: SearchParamValue) => void;
};

export const useCustomSearchParams = (): UseCustomSearchParamsResult => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setParam = useCallback(
    (key: SearchParamValue, value: string): void => {
      searchParams.set(key, value);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );
  const getParam = useCallback(
    (key: SearchParamValue): string => {
      return searchParams.get(key) ?? '';
    },
    [searchParams],
  );
  const deleteParam = useCallback(
    (key: SearchParamValue): void => {
      searchParams.delete(key);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );
  return {
    searchParams,
    setSearchParams,
    setParam,
    getParam,
    deleteParam,
  };
};
