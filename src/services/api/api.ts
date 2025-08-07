import { ERR_SOMETHING_WRONG, INITIAL_PAGE } from '@common/constants.ts';
import type { CharacterInfo, SearchResult } from './api.types.ts';
import { isLikeCharacterInfo, isLikeErrorResult, isLikeSearchResult } from './api.utils.ts';

const BASE_URL = 'https://rickandmortyapi.com/api/';
const ALL_INFOS = '';

export const Endpoint = {
  Character: `${BASE_URL}character/`,
  Episode: `${BASE_URL}episode/`,
} as const;

export const getCharactersByName = async (
  name: string = ALL_INFOS,
  page: string | number = INITIAL_PAGE,
): Promise<SearchResult> => {
  const response = await fetch(
    `${Endpoint.Character}?name=${encodeURIComponent(name)}&page=${page.toString()}`,
  );
  const result: unknown = await response.json();

  if (!isLikeSearchResult(result)) {
    throw Error(isLikeErrorResult(result) ? result.error : ERR_SOMETHING_WRONG);
  }
  return result;
};

export const getCharacterById = async (id: number | string): Promise<CharacterInfo> => {
  const response = await fetch(`${Endpoint.Character}/${id.toString()}`);
  const info: unknown = await response.json();

  if (!isLikeCharacterInfo(info)) {
    throw Error(isLikeErrorResult(info) ? info.error : ERR_SOMETHING_WRONG);
  }
  return info;
};
