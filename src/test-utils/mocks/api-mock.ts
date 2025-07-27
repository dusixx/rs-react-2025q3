/* eslint-disable @typescript-eslint/consistent-type-imports */
import { isInteger } from '@common/utils';
import { getCharacterById, getCharactersByName } from '@services/api.ts';
import type { CharacterInfo, SearchResult } from '@services/api.types.ts';
import { vi } from 'vitest';
import { FAKE_VALUE } from '../constants.ts';
import { CharacterInfoMock, getCharacterInfoListMock } from './character-mock.ts';

export const VALID_QUERY = 'rick';
export const INVALID_QUERY = FAKE_VALUE;
export const INVALID_ID = -1;
export const ERR_NOT_FOUND = 'Nothing was found';
export const ITEMS_PER_PAGE = 10;
export const ITEMS_COUNT = 5;

vi.mock('@services/api.ts', async importOriginal => {
  const actual = await importOriginal<typeof import('@services/api.ts')>();
  return {
    ...actual,
    getCharactersByName: vi.fn(async (name?: string, _page?: string): Promise<SearchResult> => {
      const count = name ? ITEMS_COUNT : ITEMS_PER_PAGE;
      return name === INVALID_QUERY
        ? Promise.reject(Error(ERR_NOT_FOUND))
        : Promise.resolve({
            info: {
              pages: 1,
              count,
              next: null,
              prev: null,
            },
            results: getCharacterInfoListMock(count),
          });
    }),
    getCharacterById: vi.fn(async (id: number | string): Promise<CharacterInfo> => {
      id = Number(id);
      return !isInteger(id) || id <= 0
        ? Promise.reject(Error(ERR_NOT_FOUND))
        : Promise.resolve({ ...CharacterInfoMock, id });
    }),
  };
});

export const getCharactersByNameMock = getCharactersByName;
export const getCharacterByIdMock = getCharacterById;
