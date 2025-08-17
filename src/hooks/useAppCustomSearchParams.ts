'use client';

import { useCustomSearchParams } from './useCustomSearchParams.ts';

export type AppCustomSearchParam = Partial<{
  details: string | number;
  page: string | number;
  q: string;
}>;

export type PropsWithAppSearchParams<P = unknown> = P & {
  searchParams?: Promise<AppCustomSearchParam>;
};

export const useAppCustomSearchParams = (): ReturnType<
  typeof useCustomSearchParams<AppCustomSearchParam>
> => {
  return useCustomSearchParams<AppCustomSearchParam>();
};
