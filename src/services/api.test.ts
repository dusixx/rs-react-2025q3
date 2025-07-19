/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { ERR_SOMETHING_WRONG } from '@common/constants.ts';
import { getErrorMessage, isString } from '@utils/index.ts';
import { getCharacterInfosMock } from 'src/test-utils/index.ts';
import { vi } from 'vitest';
import { getCharactersByName } from './api.ts';

const ERR_FETCH = 'fetch error';
const ERR_NO_RESULTS = 'no results';

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

describe('api', () => {
  vi.stubGlobal('fetch', vi.fn());

  it(`Handles fetch rejection`, async () => {
    vi.mocked(global.fetch).mockRejectedValueOnce(new Error(ERR_FETCH));
    const result = await fetchData();
    expect(result).toBe(ERR_FETCH);
  });

  it(`Handles invalid search results`, async () => {
    createResolvedValue([]);
    const result = await fetchData();
    expect(result).toBe(ERR_SOMETHING_WRONG);
  });

  it(`Handles no search results (404)`, async () => {
    createResolvedValue({ error: ERR_NO_RESULTS });
    const result = await fetchData();
    expect(result).toBe(ERR_NO_RESULTS);
  });

  it(`Handles search results`, async () => {
    createResolvedValue({
      info: {},
      results: getCharacterInfosMock(10),
    });
    const result = await fetchData();
    expect(isString(result)).toBeFalsy();
  });
});
