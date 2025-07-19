import type { CharacterInfo } from '@services/types.ts';
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
    status: chooseOneRandomly('alive', 'dead', 'unknown', undefined),
    species: chooseOneRandomly('human', 'alien', undefined),
    location: chooseOneRandomly(undefined, {
      name: chooseOneRandomly('anatomy park', 'earth', 'mars'),
    }),
  };
};

export const getCharacterInfosMock = (min: number, max: number = min): CharacterInfo[] => {
  return Array.from<CharacterInfo>({ length: rndInt(min, max) }).map((_, id) => {
    return { ...CharacterInfoMock, id };
  });
};
