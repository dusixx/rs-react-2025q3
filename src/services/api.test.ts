import { ERR_SOMETHING_WRONG } from '@common/constants.ts';
import { getErrorMessage } from '@utils/index.ts';
import { getCharacterInfoListMock } from 'src/test-utils/mocks/character-mock.ts';
import { mockFetchRejectedValue, mockFetchResolvedValue } from 'src/test-utils/mocks/fetch-mock.ts';
import { getCharactersByName } from './api.ts';

const ERR_FETCH = 'fetch error';
const ERR_NO_RESULTS = 'no results';
const ITEMS_COUNT = 10;

const fetchData = async (): Promise<ReturnType<typeof getCharactersByName> | string> => {
  try {
    return await getCharactersByName('');
  } catch (error: unknown) {
    return getErrorMessage(error, ERR_SOMETHING_WRONG);
  }
};

describe('API tests', () => {
  it(`Handles fetch rejection`, async () => {
    mockFetchRejectedValue(ERR_FETCH);
    expect(await fetchData()).toBe(ERR_FETCH);
  });

  it(`Handles invalid search results`, async () => {
    mockFetchResolvedValue([]);
    expect(await fetchData()).toBe(ERR_SOMETHING_WRONG);
  });

  it(`Handles no search results (404)`, async () => {
    mockFetchResolvedValue({ error: ERR_NO_RESULTS });
    expect(await fetchData()).toBe(ERR_NO_RESULTS);
  });

  it(`Handles search results`, async () => {
    mockFetchResolvedValue({
      info: {},
      results: getCharacterInfoListMock(ITEMS_COUNT),
    });
    expect(await fetchData()).toHaveLength(ITEMS_COUNT);
  });
});
