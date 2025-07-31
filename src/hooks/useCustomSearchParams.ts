import { convertObjectValues } from '@utils/index.ts';
import { useCallback } from 'react';
import type { SetURLSearchParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

export type UseCustomSearchParamsResult<P extends Record<string, unknown>> = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  setParams: (props: P) => void;
  getParams: (...keys: (keyof P)[]) => (string | undefined)[];
  deleteParams: (...keys: (keyof P)[]) => void;
  createParams: (props: P) => void;
  hasParams: (...keys: (keyof P)[]) => boolean;
};

const stringify = (value: unknown): string => {
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  return value == null ? '' : String(value);
};

export const useCustomSearchParams = <
  P extends Record<string, unknown> = Record<string, unknown>,
>(): UseCustomSearchParamsResult<P> => {
  const [searchParams, setSearchParams] = useSearchParams();

  const hasParams = useCallback(
    (...keys: (keyof P)[]): boolean => {
      return keys.every(key => searchParams.has(key.toString()));
    },
    [searchParams],
  );
  const createParams = useCallback(
    (props: P): void => {
      setSearchParams(new URLSearchParams(convertObjectValues(props, stringify)));
    },
    [setSearchParams],
  );
  const setParams = useCallback(
    (props: P): void => {
      Object.entries(props).forEach(([key, value]) => {
        searchParams.set(key, stringify(value));
      });
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );
  const getParams = useCallback(
    (...keys: (keyof P)[]): (string | undefined)[] => {
      return keys.map(key => searchParams.get(key.toString()) ?? undefined);
    },
    [searchParams],
  );
  const deleteParams = useCallback(
    (...keys: (keyof P)[]): void => {
      keys.forEach(key => {
        searchParams.delete(key.toString());
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
