import { UNKNOWN } from '@common/constants.ts';
import {
  getEpisodes,
  getLocationName,
  trimBracketsWithContent,
} from '@components/CardList/components/Card/Card.utils.ts';
import type { CharacterInfo } from '@services/api.types.ts';
import { isObject } from '@utils/type-guards.ts';

const stringifyValue = (value: unknown): string => {
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  return value && !isObject(value) ? trimBracketsWithContent(String(value)) : UNKNOWN;
};

export const createDescription = (info: CharacterInfo): Record<string, string> => {
  return Object.keys(info).reduce<Record<string, string>>((result, key) => {
    if (key === 'created' || key === 'image' || key === 'url') {
      return result;
    }
    let valueStr = stringifyValue(info[key]);

    if (key === 'location' || key === 'origin') {
      valueStr = getLocationName(info[key], UNKNOWN);
    } else if (key === 'episode' && info[key]?.length) {
      valueStr = getEpisodes(info[key]).join(', ');
    }
    result[key] = valueStr;
    return result;
  }, {});
};
