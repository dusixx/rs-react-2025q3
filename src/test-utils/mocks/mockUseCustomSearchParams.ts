/* eslint-disable @typescript-eslint/consistent-type-imports */
import { useAppCustomSearchParams } from '@hooks/useAppCustomSearchParams.ts';
import { vi } from 'vitest';

type T = Partial<ReturnType<typeof useAppCustomSearchParams>>;

export const mockUseAppCustomSearchResult: T = {
  getParams: vi.fn(() => []),
  deleteParams: vi.fn(),
  setParams: vi.fn(),
  createParams: vi.fn(),
  hasParams: vi.fn(),
};

vi.mock('@hooks/index.ts', async importOriginal => {
  const actual = await importOriginal<typeof import('@hooks/index.ts')>();
  return {
    ...actual,
    useAppCustomSearchParams: (): T => mockUseAppCustomSearchResult,
  };
});
