import { ERR_SOMETHING_WRONG } from '@common/constants.ts';
import type { CharacterInfo, SearchResult } from './api.types.ts';
import { isLikeCharacterInfo, isLikeErrorResult, isLikeSearchResult } from './api.utils.ts';

const BASE_URL = 'https://rickandmortyapi.com/api/';
const CHARACTERS_ENDPOINT = `${BASE_URL}character/`;
const ALL_CHARACTERS = '';

export const getCharactersByName = async (
  name: string = ALL_CHARACTERS,
  page: string | number = 1,
): Promise<SearchResult> => {
  const response = await fetch(`${CHARACTERS_ENDPOINT}?name=${name}&page=${page.toString()}`);
  const result: unknown = await response.json();

  if (isLikeSearchResult(result)) {
    return result;
  }
  throw Error(isLikeErrorResult(result) ? result.error : ERR_SOMETHING_WRONG);
};

export const getCharacterById = async (id: number | string): Promise<CharacterInfo> => {
  const response = await fetch(`${CHARACTERS_ENDPOINT}/${id.toString()}`);
  const info: unknown = await response.json();

  if (isLikeCharacterInfo(info)) {
    return info;
  }
  throw Error(ERR_SOMETHING_WRONG);
};
