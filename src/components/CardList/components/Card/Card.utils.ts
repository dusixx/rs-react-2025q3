import type {
  CharacterGender,
  CharacterLocation,
  CharacterStatus,
} from '@/services/server-actions/api/api.types';
import {
  isLikeCharacterGender,
  isLikeCharacterStatus,
} from '@/services/server-actions/api/api.utils';
import { IconFemale, IconMale, IconMaleFemale } from '@common/constants';
import type { IconType } from 'react-icons';

const GENDER_ICONS: Record<CharacterGender, IconType> = {
  male: IconMale,
  female: IconFemale,
  unknown: IconMaleFemale,
} as const;

const STATUS_INDICATOR_COLOR: Record<CharacterStatus, string> = {
  alive: 'var(--color-green)',
  dead: 'var(--color-accent)',
  unknown: 'var(--color-violet-light)',
} as const;

export const getStatusIndicatorStyle = (status: string = 'unknown'): object => {
  const st = status.toLowerCase();
  return {
    backgroundColor: STATUS_INDICATOR_COLOR[isLikeCharacterStatus(st) ? st : 'unknown'],
  };
};

export const getGenderIcon = (gender: string = 'unknown'): IconType => {
  const gen = gender.toLowerCase();
  return GENDER_ICONS[isLikeCharacterGender(gen) ? gen : 'unknown'];
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
