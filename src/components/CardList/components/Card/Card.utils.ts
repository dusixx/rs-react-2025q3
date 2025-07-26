import { IconFemale, IconMale, IconMaleFemale } from '@common/constants.ts';
import type { CharacterGender, CharacterLocation, CharacterStatus } from '@services/api.types';
import type { IconType } from 'react-icons';

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

export const getStatusIndicatorStyle = (status: CharacterStatus = 'unknown'): object => {
  const statusLower = status.toLowerCase();
  return {
    backgroundColor:
      statusLower === 'alive'
        ? 'var(--color-green)'
        : statusLower === 'dead'
          ? 'var(--color-green-gray)'
          : 'var(--color-violet-light)',
  };
};

export const getGenderIcon = (gender: CharacterGender = 'unknown'): IconType => {
  const genderLower = gender.toLowerCase();
  return genderLower === 'female' ? IconFemale : genderLower === 'male' ? IconMale : IconMaleFemale;
};
