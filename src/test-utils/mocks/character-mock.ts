import { chooseOneRandomly, rndInt } from '@common/utils';
import type {
  CharacterGender,
  CharacterInfo,
  CharacterLocation,
  CharacterStatus,
} from '@services/api.types';

const IMAGE_SRC = '/annie-image.jpeg';
const RICK_IMAGE_SRC = '/rick.jpeg';

export const characterMock: CharacterInfo = {
  id: 1,
  image: IMAGE_SRC,
  name: 'annie',
  status: 'alive',
  species: 'human',
  gender: 'female',
  location: {
    name: 'anatomy park',
  },
};

export const rickCharacterMock: Required<CharacterInfo> = {
  id: 7123489,
  image: RICK_IMAGE_SRC,
  url: 'https://rickandmortyapi.com/api/character/1',
  name: 'Rick Sanchez',
  status: 'alive',
  species: 'human',
  type: '',
  gender: 'male',
  origin: { name: '"Earth (C-137)"' },
  location: { name: 'Citadel of Ricks (Replacement Dimension)' },
  episode: [
    'https://rickandmortyapi.com/api/episode/1',
    'https://rickandmortyapi.com/api/episode/2',
    'https://rickandmortyapi.com/api/episode/3',
  ],
  created: '"2017-11-04T18:48:46.250Z"',
};

export const getCharacterInfoMock = (id: number = rndInt(1, 100)): CharacterInfo => {
  return {
    id,
    image: chooseOneRandomly(IMAGE_SRC, undefined),
    name: chooseOneRandomly('annie', 'dorothy', undefined),
    species: chooseOneRandomly('human', 'alien', undefined),
    status: chooseOneRandomly<CharacterStatus | undefined>('alive', 'dead', 'unknown', undefined),
    gender: chooseOneRandomly<CharacterGender | undefined>('female', 'male', 'unknown', undefined),
    location: chooseOneRandomly<CharacterLocation | undefined>(undefined, {
      name: chooseOneRandomly('anatomy park', 'earth', 'mars'),
    }),
  };
};

export const getCharacterInfoListMock = (min: number, max: number = min): CharacterInfo[] => {
  return Array.from<CharacterInfo>({ length: rndInt(min, max) }).map((_, id) => {
    return { ...characterMock, id };
  });
};
