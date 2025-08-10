import { INITIAL_PAGE } from '@common/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CharacterInfo, SearchResult } from 'src/redux/api/api.types.ts';
import { fetchWithDelay } from './api.utils.ts';

const REQUEST_TIMEOUT = 5000;
export const BASE_URL = 'https://rickandmortyapi.com/api/';
export const ALL_INFOS = '';

export const Endpoint = {
  Character: `${BASE_URL}character/`,
  Episode: `${BASE_URL}episode/`,
} as const;

type GetCharacterByNameProps = {
  name?: string;
  page?: string | number;
};

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  fetchFn: fetchWithDelay,
  timeout: REQUEST_TIMEOUT,
});

export const rickmortyApi = createApi({
  reducerPath: 'rickmortyApi',
  baseQuery,
  refetchOnReconnect: true,
  endpoints: build => ({
    getCharactersByName: build.query<SearchResult, GetCharacterByNameProps>({
      query: ({ name = ALL_INFOS, page = INITIAL_PAGE }) => ({
        url: Endpoint.Character,
        params: { name, page },
      }),
    }),
    getCharacterById: build.query<CharacterInfo, number | string>({
      query: id => `${Endpoint.Character}/${id.toString()}`,
    }),
  }),
});
export const { useGetCharactersByNameQuery, useGetCharacterByIdQuery } = rickmortyApi;
