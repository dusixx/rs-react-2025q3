/* eslint-disable @typescript-eslint/consistent-type-imports */
import { isNumericPositiveInteger } from '@common/utils';
import { getCharacterById, getCharactersByName } from '@services/api.ts';
import type { CharacterInfo, SearchResult } from '@services/api.types.ts';
import { vi } from 'vitest';
import { FAKE_VALUE } from '../constants.ts';
import { characterMock, searchResultMock } from './character-mock.ts';

export const VALID_QUERY = 'rick';
export const INVALID_QUERY = FAKE_VALUE;
export const INVALID_ID = -1;
export const ERR_NOT_FOUND = 'Nothing was found';

vi.mock('@services/api.ts', async importOriginal => {
  const actual = await importOriginal<typeof import('@services/api.ts')>();
  return {
    ...actual,
    getCharactersByName: vi.fn(async (name?: string): Promise<SearchResult> => {
      return name === INVALID_QUERY
        ? Promise.reject(Error(ERR_NOT_FOUND))
        : Promise.resolve(searchResultMock);
    }),
    getCharacterById: vi.fn(async (id: number | string): Promise<CharacterInfo> => {
      return !isNumericPositiveInteger(id)
        ? Promise.reject(Error(ERR_NOT_FOUND))
        : Promise.resolve({ ...characterMock, id: Number(id) });
    }),
  };
});
export const getCharactersByNameMock = getCharactersByName;
export const getCharacterByIdMock = getCharacterById;
