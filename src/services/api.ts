import { ERR_SOMETHING_WRONG } from '@common/constants.ts';
import type { CharacterInfo } from './types.ts';
import { isLikeCharacterInfos, isLikeErrorResult, isLikeSearchResult } from './utils.ts';

const BASE_URL = 'https://rickandmortyapi.com/api/';

export const getCharactersByName = async (name: string): Promise<CharacterInfo[]> => {
  const response = await fetch(`${BASE_URL}character/?name=${name}`);
  const infos: unknown = await response.json();

  if (isLikeSearchResult(infos) && isLikeCharacterInfos(infos.results)) {
    return infos.results;
  }
  throw Error(isLikeErrorResult(infos) ? infos.error : ERR_SOMETHING_WRONG);
};
