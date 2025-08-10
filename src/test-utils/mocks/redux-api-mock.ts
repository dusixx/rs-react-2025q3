/* eslint-disable @typescript-eslint/consistent-type-imports */
import { useGetCharacterByIdQuery, useGetCharactersByNameQuery } from 'src/redux/api/api';
import { vi } from 'vitest';

export const mockUseGetCharactersByNameQuery = useGetCharactersByNameQuery;
export const mockUseGetCharacterByIdQuery = useGetCharacterByIdQuery;

vi.mock('src/redux/api/api.ts', async importOriginal => {
  const actual = await importOriginal<typeof import('src/redux/api/api')>();
  return {
    ...actual,
    useGetCharactersByNameQuery: vi.fn(),
    useGetCharacterByIdQuery: vi.fn(),
  };
});
