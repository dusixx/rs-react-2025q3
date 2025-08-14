/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { UNKNOWN } from '@common/constants';
import {
  getEpisodes,
  getLocationName,
  trimBracketsWithContent,
} from '@components/CardList/components/Card/Card.utils.ts';
import { isObject } from '@utils/type-guards.ts';
import type { CharacterInfo } from 'src/redux/api/api.types';

const EPISODES_SPLITTER = ', ';

const stringifyValue = (value: unknown): string => {
  return value && !isObject(value) ? trimBracketsWithContent(String(value)) : UNKNOWN;
};

export const createDescription = (
  info: CharacterInfo,
  episodesSplitter: string = EPISODES_SPLITTER,
): Record<string, string> => {
  return Object.keys(info).reduce<Record<string, string>>((result, key) => {
    const k = key as keyof CharacterInfo;
    let stringifiedValue = stringifyValue(info[k]);

    switch (k) {
      case 'created':
      case 'image':
      case 'url': {
        return result;
      }
      case 'location':
      case 'origin': {
        stringifiedValue = getLocationName(info[k], UNKNOWN);
        break;
      }
      case 'episode': {
        if (info[k]) {
          stringifiedValue = getEpisodes(info[k]).join(episodesSplitter);
        }
        break;
      }
    }
    result[k] = stringifiedValue;
    return result;
  }, {});
};
