export type CharacterInfo = {
  id: number;
  name: string;
  image: string;
  status: 'alive' | 'dead' | 'unknown';
  gender: 'male' | 'female' | 'unknown';
  species: string;
  location: {
    name: string;
    url: string;
  };
};

export type SearchResult = {
  info: object;
  results: unknown[];
};
