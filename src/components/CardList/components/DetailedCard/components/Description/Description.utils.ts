/* eslint-disable @typescript-eslint/no-base-to-string */

import type { CharacterInfo } from '@/services/server-actions/api/api.types';
import { UNKNOWN } from '@common/constants';
import {
  getEpisodes,
  getLocationName,
  trimBracketsWithContent,
} from '@components/CardList/components/Card/Card.utils.ts';
import { getObjectKeys, isObject } from '@utils/type-guards.ts';

const EPISODES_SPLITTER = ', ';

const stringifyValue = (value: unknown): string => {
  return value && !isObject(value) ? trimBracketsWithContent(String(value)) : UNKNOWN;
};

export const createDescription = (
  info: CharacterInfo,
  episodesSplitter: string = EPISODES_SPLITTER,
): Record<string, string> => {
  return getObjectKeys(info).reduce<Record<string, string>>((result, key) => {
    let stringifiedValue = stringifyValue(info[key]);

    switch (key) {
      case 'created':
      case 'image':
      case 'url': {
        return result;
      }
      case 'location':
      case 'origin': {
        stringifiedValue = getLocationName(info[key], UNKNOWN);
        break;
      }
      case 'episode': {
        if (info[key]) {
          stringifiedValue = getEpisodes(info[key]).join(episodesSplitter);
        }
      }
    }
    result[key] = stringifiedValue;
    return result;
  }, {});
};
