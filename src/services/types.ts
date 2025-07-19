export type CharacterLocation = {
  name: string;
  url?: string;
};

export type CharacterStatus = 'alive' | 'dead' | 'unknown';
export type CharacterGender = 'male' | 'female' | 'unknown';

export type CharacterInfo = {
  id: number;
  name?: string;
  image?: string;
  status?: CharacterStatus;
  gender?: CharacterGender;
  species?: string;
  location?: CharacterLocation;
};

export type SearchResult = {
  info: object;
  results: unknown[];
};
