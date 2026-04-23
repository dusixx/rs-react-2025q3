export type CharacterLocation = {
  name: string;
  url?: string;
};
export type CharacterStatus = 'alive' | 'dead' | 'unknown';
export type CharacterGender = 'male' | 'female' | 'unknown';
export type CharacterInfo = Record<string, unknown> & {
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
