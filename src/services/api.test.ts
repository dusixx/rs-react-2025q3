import { ERR_SOMETHING_WRONG } from '@common/constants.ts';
import { characterMock, searchResultMock } from 'src/test-utils/mocks/character-mock.ts';
import { fetchMock } from 'src/test-utils/mocks/index.ts';
import { getCharacterById, getCharactersByName } from './api.ts';
import type { CharacterInfo } from './api.types.ts';

const ERR_FETCH = 'fetch error';
const ERR_NO_RESULTS = 'no results';

describe('API tests', () => {
  it(`Handles fetch rejection`, async () => {
    fetchMock.mockRejectedValueOnce(ERR_FETCH);
    await expect(getCharactersByName()).rejects.toThrow(ERR_FETCH);
    fetchMock.mockRejectedValueOnce(ERR_FETCH);
    await expect(getCharacterById('')).rejects.toThrow(ERR_FETCH);
  });

  it(`Handles invalid search results`, async () => {
    fetchMock.mockResolvedValueOnce(null);
    await expect(getCharactersByName()).rejects.toThrow(ERR_SOMETHING_WRONG);
    fetchMock.mockResolvedValueOnce(null);
    await expect(getCharacterById('')).rejects.toThrow(ERR_SOMETHING_WRONG);
  });

  it(`Handles no search results (404)`, async () => {
    fetchMock.mockResolvedValueOnce({
      error: ERR_NO_RESULTS,
    });
    await expect(getCharactersByName()).rejects.toThrow(ERR_NO_RESULTS);
    fetchMock.mockResolvedValueOnce({
      error: ERR_NO_RESULTS,
    });
    await expect(getCharacterById('')).rejects.toThrow(ERR_NO_RESULTS);
  });

  it(`Handles valid search results`, async () => {
    fetchMock.mockResolvedValueOnce(searchResultMock);
    expect(await getCharactersByName()).toHaveProperty(
      'results.length',
      searchResultMock.info.count,
    );
    fetchMock.mockResolvedValueOnce<CharacterInfo>(characterMock);
    expect(await getCharacterById('')).toEqual(characterMock);
  });
});
