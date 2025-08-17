import { every, hasOwnKeys, isInteger, isOneOf, isString } from '@common/utils/index.ts';
import type { CharacterStatus } from './api.types.ts';
import {
  type CharacterGender,
  type CharacterInfo,
  type SearchResult,
  type SearchResultInfo,
} from './api.types.ts';

export const isLikeCharacterInfo = (obj: unknown): obj is CharacterInfo => {
  return (
    hasOwnKeys<CharacterInfo>(
      obj,
      'id',
      'name',
      'status',
      'gender',
      'species',
      'image',
      'location',
    ) && hasOwnKeys(obj.location, 'name')
  );
};

export const isLikeCharacterInfoArray = (obj: unknown): obj is CharacterInfo[] => {
  return Array.isArray(obj) && obj.every(isLikeCharacterInfo);
};

export const isLikeSearchResult = (obj: unknown): obj is SearchResult => {
  return (
    hasOwnKeys<SearchResult>(obj, 'info', 'results') &&
    isLikeCharacterInfoArray(obj.results) &&
    isLikeSearchResultInfo(obj.info)
  );
};

export const isLikeErrorResult = (obj: unknown): obj is { error: string } => {
  return hasOwnKeys(obj, 'error') && isString(obj.error) && obj.error.length !== 0;
};

export const isLikeSearchResultInfo = (obj: unknown): obj is SearchResultInfo => {
  return (
    hasOwnKeys<SearchResultInfo>(obj, 'count', 'pages', 'next', 'prev') &&
    every(isInteger, obj.count, obj.pages)
  );
};

export const isLikeCharacterStatus = (v: unknown): v is CharacterStatus => {
  return isOneOf<CharacterStatus>(v, 'alive', 'dead', 'unknown');
};

export const isLikeCharacterGender = (v: unknown): v is CharacterGender => {
  return isOneOf<CharacterGender>(v, 'female', 'male', 'unknown');
};
