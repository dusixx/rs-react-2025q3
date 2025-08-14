import { rndInt } from '@utils/index.ts';
import { Endpoint } from 'src/redux/api/api';
import type { CharacterInfo, SearchResult } from 'src/redux/api/api.types';

export const ITEMS_PER_PAGE = 20;
export const PAGES_COUNT = 10;
export const EPISODES_COUNT = 10;
export const CHARACTER_ID = 897;

const getEpisodesMock = (length: number = EPISODES_COUNT): string[] => {
  return Array.from({ length }).map((_, idx) => `${Endpoint.Episode}/${String(idx + 1)}`);
};

export const characterMock: Required<CharacterInfo> = {
  id: CHARACTER_ID,
  image: '/rick.jpeg',
  name: 'Rick Sanchez',
  status: 'alive',
  species: 'human',
  gender: 'male',
  type: '',
  origin: { name: '"Earth (C-137)"' },
  location: { name: 'Citadel of Ricks (Replacement Dimension)' },
  created: '"2017-11-04T18:48:46.250Z"',
  episode: getEpisodesMock(),
  url: `${Endpoint.Character}/1`,
};

export const getCharacterInfoListMock = (min: number, max: number = min): CharacterInfo[] => {
  return Array.from<CharacterInfo>({ length: rndInt(min, max) }).map((_, idx) => {
    return { ...characterMock, id: idx + 1 };
  });
};

type GetCharacterInfoMockResult = {
  record: Record<number, CharacterInfo>;
  array: CharacterInfo[];
};
export const getCharacterInfosMock = (itemsCount: number): GetCharacterInfoMockResult => {
  const array = getCharacterInfoListMock(itemsCount);
  const record = array.reduce<GetCharacterInfoMockResult['record']>((result, info) => {
    result[info.id] = info;
    return result;
  }, {});

  return {
    array,
    record,
  };
};

export const searchResultMock: SearchResult = {
  info: {
    count: ITEMS_PER_PAGE,
    pages: PAGES_COUNT,
    next: null,
    prev: null,
  },
  results: getCharacterInfoListMock(ITEMS_PER_PAGE),
};
