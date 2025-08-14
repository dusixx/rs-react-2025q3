/* eslint-disable @typescript-eslint/consistent-type-imports */
import { useGetCharacterByIdQuery, useGetCharactersByNameQuery } from 'src/redux/api/api';
import { useAppDispatch, useSelectedInfos } from 'src/redux/store/hooks.ts';
import { vi } from 'vitest';

export const mockUseGetCharactersByNameQuery = useGetCharactersByNameQuery;
export const mockUseGetCharacterByIdQuery = useGetCharacterByIdQuery;

vi.mock('src/redux/api/api', async importOriginal => {
  const actual = await importOriginal<typeof import('src/redux/api/api.ts')>();
  return {
    ...actual,
    useGetCharactersByNameQuery: vi.fn(),
    useGetCharacterByIdQuery: vi.fn(),
  };
});
export const mockUseSelectedInfos = useSelectedInfos;
export const appDispatchMock = vi.fn();

vi.mock('src/redux/store/hooks.ts', async () => {
  const actual = await vi.importActual('src/redux/store/hooks.ts');
  return {
    ...actual,
    useSelectedInfos: vi.fn(),
    useAppDispatch: (): ReturnType<typeof useAppDispatch> => appDispatchMock,
  };
});
