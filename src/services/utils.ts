import { hasOwnKeys, isObject, isString } from '@utils/index.ts';
import type { CharacterInfo, SearchResult } from './types.ts';

const isLikeCharacterInfo = (obj: unknown): obj is CharacterInfo => {
  return (
    hasOwnKeys(obj, 'id', 'name', 'status', 'gender', 'species', 'image', 'location') &&
    hasOwnKeys(obj.location, 'name')
  );
};

export const isLikeCharacterInfos = (obj: unknown): obj is CharacterInfo[] => {
  return Array.isArray(obj) && isLikeCharacterInfo(obj[0]);
};

export const isLikeSearchResult = (obj: unknown): obj is SearchResult => {
  return hasOwnKeys(obj, 'info', 'results') && Array.isArray(obj.results) && isObject(obj.info);
};

export const isLikeErrorResult = (obj: unknown): obj is { error: string } => {
  return hasOwnKeys(obj, 'error') && isString(obj.error) && obj.error !== '';
};
