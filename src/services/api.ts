import type { CharacterInfo } from './types.ts';
import { isLikeCharacterInfos, isLikeError, isLikeSearchResults } from './utils.ts';

const BASE_URL = 'https://rickandmortyapi.com/api/';
const ERR_SOMETHING_WRONG = 'Something went wrong';

export const getCharactersByName = async (name: string): Promise<CharacterInfo[]> => {
  const response = await fetch(`${BASE_URL}character/?name=${name}`);
  const infos: unknown = await response.json();

  if (!isLikeSearchResults(infos)) {
    throw Error(isLikeError(infos) ? infos.error : ERR_SOMETHING_WRONG);
  }
  if (isLikeCharacterInfos(infos.results)) {
    return infos.results;
  }
  throw Error(ERR_SOMETHING_WRONG);
};
