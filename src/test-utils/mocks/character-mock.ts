import type {
  CharacterGender,
  CharacterInfo,
  CharacterLocation,
  CharacterStatus,
} from '@services/api.types';
import { chooseOneRandomly, rndInt } from '@utils/index.ts';

const IMAGE_SRC = '/annie-image.jpeg';

export const CharacterInfoMock: CharacterInfo = {
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
    return { ...CharacterInfoMock, id };
  });
};
