/* eslint-disable @typescript-eslint/consistent-type-imports */
import { getCharactersByName } from '@services/api.ts';
import type { CharacterInfo } from '@services/api.types.ts';
import { vi } from 'vitest';
import { FAKE_VALUE } from '../constants.ts';
import { getCharacterInfoListMock } from './character-mock.ts';

export const VALID_QUERY = 'rick';
export const INVALID_QUERY = FAKE_VALUE;
export const ERR_NOT_FOUND = 'Nothing was found';
export const ITEMS_PER_PAGE = 10;
export const ITEMS_COUNT = 5;

vi.mock('@services/api.ts', async importOriginal => {
  const actual = await importOriginal<typeof import('@services/api.ts')>();
  return {
    ...actual,
    getCharactersByName: vi.fn(async (query?: string): Promise<CharacterInfo[]> => {
      return query === INVALID_QUERY
        ? Promise.reject(Error(ERR_NOT_FOUND))
        : Promise.resolve(getCharacterInfoListMock(query ? ITEMS_COUNT : ITEMS_PER_PAGE));
    }),
  };
});

export const getCharactersByNameMock = getCharactersByName;
