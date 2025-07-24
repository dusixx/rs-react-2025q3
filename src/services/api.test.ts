/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { ERR_SOMETHING_WRONG } from '@common/constants.ts';
import { getErrorMessage } from '@utils/index.ts';
import { getCharacterInfosMock } from 'src/test-utils/mocks/character-mock.ts';
import { vi } from 'vitest';
import { getCharactersByName } from './api.ts';

const ERR_FETCH = 'fetch error';
const ERR_NO_RESULTS = 'no results';
const ITEMS_COUNT = 10;

vi.stubGlobal('fetch', vi.fn());

const fetchData = async (): Promise<ReturnType<typeof getCharactersByName> | string> => {
  try {
    return await getCharactersByName('');
  } catch (error: unknown) {
    return getErrorMessage(error, ERR_SOMETHING_WRONG);
  }
};
const createResolvedValue = (result: unknown, once: boolean = true): void => {
  vi.mocked(global.fetch)[once ? 'mockResolvedValueOnce' : 'mockResolvedValue']({
    json() {
      return result;
    },
  } as Response);
};

describe('API tests', () => {
  it(`Handles fetch rejection`, async () => {
    vi.mocked(global.fetch).mockRejectedValueOnce(Error(ERR_FETCH));
    expect(await fetchData()).toBe(ERR_FETCH);
  });

  it(`Handles invalid search results`, async () => {
    createResolvedValue([]);
    expect(await fetchData()).toBe(ERR_SOMETHING_WRONG);
  });

  it(`Handles no search results (404)`, async () => {
    createResolvedValue({ error: ERR_NO_RESULTS });
    expect(await fetchData()).toBe(ERR_NO_RESULTS);
  });

  it(`Handles search results`, async () => {
    createResolvedValue({
      info: {},
      results: getCharacterInfosMock(ITEMS_COUNT),
    });
    expect(await fetchData()).toHaveLength(ITEMS_COUNT);
  });
});
