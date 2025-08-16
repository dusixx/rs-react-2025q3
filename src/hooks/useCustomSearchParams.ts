/* eslint-disable @typescript-eslint/no-base-to-string */
'use client';

import { mapObjectValues } from '@utils/index.ts';
import type { ReadonlyURLSearchParams } from 'next/navigation';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const EMPTY_PATHNAME = '';

export type UseCustomSearchParamsResult<P extends Record<string, unknown>> = {
  searchParams: ReadonlyURLSearchParams | null;
  setParams: (props: P) => void;
  createParams: (props: P) => void;
  getParams: (...keys: (keyof P)[]) => (string | undefined)[];
  deleteParams: (...keys: (keyof P)[]) => void;
  hasParams: (...keys: (keyof P)[]) => boolean;
  clearParams: () => void;
};

const stringify = (value: unknown): string => {
  return value != null ? String(value) : '';
};

export const useCustomSearchParams = <
  P extends Record<string, unknown> = Record<string, unknown>,
>(): UseCustomSearchParamsResult<P> => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const hasParams = useCallback(
    (...keys: (keyof P)[]): boolean => {
      return keys.every(key => searchParams?.has(key.toString()));
    },
    [searchParams],
  );
  const createParams = useCallback(
    (props: P): void => {
      const params = new URLSearchParams(mapObjectValues(props, stringify));
      router.push(`${pathname ?? EMPTY_PATHNAME}?${params.toString()}`);
    },
    [router, pathname],
  );
  const setParams = useCallback(
    (props: P): void => {
      const params = new URLSearchParams(mapObjectValues(props, stringify));
      Object.entries(props).forEach(([key, value]) => {
        params.set(key, stringify(value));
      });
      router.push(`${pathname ?? EMPTY_PATHNAME}?${params.toString()}`);
    },
    [pathname, router],
  );
  const getParams = useCallback(
    (...keys: (keyof P)[]): (string | undefined)[] => {
      const params = new URLSearchParams(searchParams?.toString());
      return keys.map(key => params.get(key.toString()) ?? undefined);
    },
    [searchParams],
  );
  const deleteParams = useCallback(
    (...keys: (keyof P)[]): void => {
      const params = new URLSearchParams(searchParams?.toString());
      keys.forEach(key => {
        params.delete(key.toString());
      });
      router.push(`${pathname ?? EMPTY_PATHNAME}?${params.toString()}`);
    },
    [searchParams, router, pathname],
  );
  const clearParams = useCallback((): void => {
    router.replace(pathname ?? EMPTY_PATHNAME);
  }, [router, pathname]);

  return {
    searchParams,
    setParams,
    getParams,
    deleteParams,
    createParams,
    hasParams,
    clearParams,
  };
};
