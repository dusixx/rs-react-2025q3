import { useCustomSearchParams } from './useCustomSearchParams.ts';

export type AppCustomSearchParam = Partial<{
  details: string | number;
  page: string | number;
  q: string;
}>;

export const useAppCustomSearchParams = (): ReturnType<typeof useCustomSearchParams> => {
  return useCustomSearchParams<AppCustomSearchParam>();
};
