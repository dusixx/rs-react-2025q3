import { IconFemale, IconMale, IconMaleFemale } from '@common/constants.ts';
import type { CharacterLocation } from '@services/api/api.types';
import type { IconType } from 'react-icons';

const GENDER_ICONS: Record<string, IconType> = {
  male: IconMale,
  female: IconFemale,
  unknown: IconMaleFemale,
} as const;

const STATUS_INDICATOR_COLOR: Record<string, string> = {
  alive: 'var(--color-green)',
  dead: 'var(--color-green-gray)',
  unknown: 'var(--color-violet-light)',
} as const;

export const getStatusIndicatorStyle = (status: string = 'unknown'): object => {
  return {
    backgroundColor:
      STATUS_INDICATOR_COLOR[status.toLowerCase()] ?? STATUS_INDICATOR_COLOR['unknown'],
  };
};

export const getGenderIcon = (gender: string = 'unknown'): IconType => {
  return GENDER_ICONS[gender.toLowerCase()] ?? GENDER_ICONS['unknown'];
};

export const trimBracketsWithContent = (text: string): string => {
  return text.replace(/\s*\(.+/, '');
};

export const getEpisodes = (urls: string[]): string[] => {
  return urls.map(url => {
    const arr = url.split('/');
    return arr[arr.length - 1];
  });
};

export const getLocationName = (
  location: CharacterLocation | undefined,
  defaultName?: string,
): string => {
  return (trimBracketsWithContent(location?.name ?? '') || defaultName) ?? '';
};

export const getThumbStyle = (image?: string): object => {
  return {
    opacity: image ? 1 : 0.1,
    flex: image ? 0 : 1,
  };
};
