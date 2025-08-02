/* eslint-disable @typescript-eslint/consistent-type-imports */
import { isNumericPositiveInteger } from '@common/utils';
import { getCharacterById, getCharactersByName } from '@services/api/api.ts';
import type { CharacterInfo, SearchResult } from '@services/api/api.types.ts';
import { saveInfosToFile } from '@services/file-saver/file-saver.ts';
import { vi } from 'vitest';
import { FAKE_VALUE } from '../constants.ts';
import { characterMock, searchResultMock } from './character-mock.ts';

export const VALID_QUERY = 'rick';
export const INVALID_QUERY = FAKE_VALUE;
export const INVALID_ID = -1;
export const ERR_NOT_FOUND = 'Nothing was found';

export const getCharactersByNameMock = getCharactersByName;
export const getCharacterByIdMock = getCharacterById;

vi.mock('@services/api/api.ts', async importOriginal => {
  const actual = await importOriginal<typeof import('@services/api/api.ts')>();
  return {
    ...actual,
    getCharactersByName: vi.fn(async (name?: string): Promise<SearchResult> => {
      return name === INVALID_QUERY
        ? Promise.reject(Error(ERR_NOT_FOUND))
        : Promise.resolve(searchResultMock);
    }),
    getCharacterById: vi.fn(async (id: number | string): Promise<CharacterInfo> => {
      return isNumericPositiveInteger(id)
        ? Promise.resolve({ ...characterMock, id: Number(id) })
        : Promise.reject(Error(ERR_NOT_FOUND));
    }),
  };
});

export const saveInfosToFileMock = saveInfosToFile;

vi.mock('@services/file-saver/file-saver.ts', async importOriginal => {
  const actual = await importOriginal<typeof import('@services/file-saver/file-saver.ts')>();
  return {
    ...actual,
    saveInfosToFile: vi.fn(),
  };
});
