export type CharacterLocation = {
  name: string;
  url?: string;
};
export const CHARACTER_STATUS = ['alive', 'dead', 'unknown'] as const;
export const CHARACTER_GENDER = ['male', 'female', 'unknown'] as const;

export type CharacterStatus = (typeof CHARACTER_STATUS)[number];
export type CharacterGender = (typeof CHARACTER_GENDER)[number];
export type CharacterInfo = {
  id: number;
  name?: string;
  image?: string;
  species?: string;
  status?: CharacterStatus;
  gender?: CharacterGender;
  location?: CharacterLocation;
  origin?: CharacterLocation;
  episode?: string[];
  type?: string;
  created?: string;
  url?: string;
};

export type SearchResultInfo = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

export type SearchResult = {
  info: SearchResultInfo;
  results: CharacterInfo[];
};
