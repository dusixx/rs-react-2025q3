import { ERR_SOMETHING_WRONG } from '@common/constants.ts';
import {
  getCharacterInfoListMock,
  mockFetchRejectedValueOnce,
  mockFetchResolvedValueOnce,
} from 'src/test-utils/mocks/index.ts';
import { getCharactersByName } from './api.ts';

const ERR_FETCH = 'fetch error';
const ERR_NO_RESULTS = 'no results';
const ITEMS_COUNT = 10;

describe('API tests', () => {
  it(`Handles fetch rejection`, async () => {
    mockFetchRejectedValueOnce(ERR_FETCH);
    await expect(getCharactersByName()).rejects.toThrow(ERR_FETCH);
  });

  it(`Handles invalid search results`, async () => {
    mockFetchResolvedValueOnce();
    await expect(getCharactersByName()).rejects.toThrow(ERR_SOMETHING_WRONG);
  });

  it(`Handles no search results (404)`, async () => {
    mockFetchResolvedValueOnce({
      error: ERR_NO_RESULTS,
    });
    await expect(getCharactersByName()).rejects.toThrow(ERR_NO_RESULTS);
  });

  it(`Handles valid search results`, async () => {
    mockFetchResolvedValueOnce({
      info: {},
      results: getCharacterInfoListMock(ITEMS_COUNT),
    });
    expect(await getCharactersByName()).toHaveLength(ITEMS_COUNT);
  });
});
