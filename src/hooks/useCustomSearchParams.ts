import type { SearchParamKey } from '@common/constants.ts';
import { useCallback } from 'react';
import type { SetURLSearchParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

type SearchParamValue = (typeof SearchParamKey)[keyof typeof SearchParamKey];
type SetParamsProps = Partial<Record<SearchParamValue, string>>;

export type UseCustomSearchParamsResult = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  setParams: (props: SetParamsProps) => void;
  getParams: (...keys: SearchParamValue[]) => string[];
  deleteParams: (...keys: SearchParamValue[]) => void;
  createParams: (props: SetParamsProps) => void;
  hasParams: (...keys: SearchParamValue[]) => boolean;
};

export const useCustomSearchParams = (): UseCustomSearchParamsResult => {
  const [searchParams, setSearchParams] = useSearchParams();

  const hasParams = useCallback(
    (...keys: SearchParamValue[]): boolean => {
      return keys.every(key => searchParams.has(key));
    },
    [searchParams],
  );
  const createParams = useCallback(
    (props: SetParamsProps): void => {
      setSearchParams(new URLSearchParams(props));
    },
    [setSearchParams],
  );
  const setParams = useCallback(
    (props: SetParamsProps): void => {
      Object.entries(props).forEach(([key, value]) => {
        searchParams.set(key, value);
      });
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );
  const getParams = useCallback(
    (...keys: SearchParamValue[]): string[] => {
      return keys.map(key => searchParams.get(key) ?? '');
    },
    [searchParams],
  );
  const deleteParams = useCallback(
    (...keys: SearchParamValue[]): void => {
      keys.forEach(key => {
        searchParams.delete(key);
      });
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );
  return {
    searchParams,
    setSearchParams,
    setParams,
    getParams,
    deleteParams,
    createParams,
    hasParams,
  };
};
