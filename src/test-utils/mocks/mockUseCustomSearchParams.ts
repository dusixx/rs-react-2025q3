/* eslint-disable @typescript-eslint/consistent-type-imports */
import { CustomSearchParam } from '@common/types.ts';
import type { UseCustomSearchParamsResult } from '@hooks/useCustomSearchParams.ts';
import { vi } from 'vitest';

type T = Partial<UseCustomSearchParamsResult<CustomSearchParam>>;

export const mockUseCustomSearchResult: T = {
  getParams: vi.fn(() => []),
  deleteParams: vi.fn(),
  setParams: vi.fn(),
  createParams: vi.fn(),
  hasParams: vi.fn(),
};

vi.mock('@hooks/useCustomSearchParams.ts', async importOriginal => {
  const actual = await importOriginal<typeof import('@hooks/useCustomSearchParams.ts')>();
  return {
    ...actual,
    useCustomSearchParams: (): T => mockUseCustomSearchResult,
  };
});
