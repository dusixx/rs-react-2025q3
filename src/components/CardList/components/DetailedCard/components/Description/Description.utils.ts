/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/no-base-to-string */
import { UNKNOWN } from '@common/constants.ts';
import {
  getEpisodes,
  getLocationName,
  trimBracketsWithContent,
} from '@components/CardList/components/Card/Card.utils.ts';
import type { CharacterInfo } from '@services/api/api.types';
import { isObject } from '@utils/type-guards.ts';

const stringifyValue = (value: unknown): string => {
  return value && !isObject(value) ? trimBracketsWithContent(String(value)) : UNKNOWN;
};

export const createDescription = (
  info: CharacterInfo,
  episodesSplitter: string = ', ',
): Record<string, string> => {
  return Object.keys(info).reduce<Record<string, string>>((result, key) => {
    const k = key as keyof CharacterInfo;

    if (k === 'created' || k === 'image' || k === 'url') {
      return result;
    }
    let valueStr = stringifyValue(info[k]);

    if (k === 'location' || k === 'origin') {
      valueStr = getLocationName(info[k], UNKNOWN);
    } else if (k === 'episode' && info[k]?.length) {
      valueStr = getEpisodes(info[k]).join(episodesSplitter);
    }
    result[k] = valueStr;
    return result;
  }, {});
};
