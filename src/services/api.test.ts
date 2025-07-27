import { ERR_SOMETHING_WRONG } from '@common/constants.ts';
import { fetchMock, getCharacterInfoListMock } from 'src/test-utils/mocks/index.ts';
import { getCharactersByName } from './api.ts';
import type { SearchResult } from './api.types.ts';

const ERR_FETCH = 'fetch error';
const ERR_NO_RESULTS = 'no results';
const ITEMS_COUNT = 10;

describe('API tests', () => {
  it(`Handles fetch rejection`, async () => {
    fetchMock.mockRejectedValueOnce(ERR_FETCH);
    await expect(getCharactersByName()).rejects.toThrow(ERR_FETCH);
  });

  it(`Handles invalid search results`, async () => {
    fetchMock.mockResolvedValueOnce(null);
    await expect(getCharactersByName()).rejects.toThrow(ERR_SOMETHING_WRONG);
  });

  it(`Handles no search results (404)`, async () => {
    fetchMock.mockResolvedValueOnce({
      error: ERR_NO_RESULTS,
    });
    await expect(getCharactersByName()).rejects.toThrow(ERR_NO_RESULTS);
  });

  it(`Handles valid search results`, async () => {
    fetchMock.mockResolvedValueOnce<SearchResult>({
      info: {
        count: 1,
        pages: 1,
        prev: null,
        next: null,
      },
      results: getCharacterInfoListMock(ITEMS_COUNT),
    });
    expect(await getCharactersByName()).toHaveProperty('results.length', ITEMS_COUNT);
  });
});
