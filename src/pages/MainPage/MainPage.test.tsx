/* eslint-disable @typescript-eslint/consistent-type-imports */
import { getCharactersByName } from '@services/api.ts';
import type { CharacterInfo } from '@services/types.ts';
import { render } from '@testing-library/react';
import { act } from 'react';
import {
  changeInput,
  clickElement,
  FAKE_VALUE,
  getCharacterInfosMock,
  getNestedChild,
} from 'src/test-utils/index.ts';
import { vi } from 'vitest';
import MainPage from './MainPage.tsx';
import { getPersistedQuery, setPersistedQuery } from './index.ts';

const storeMock = {
  query: '',
};
const VALID_QUERY = 'rick';
const INVALID_QUERY = FAKE_VALUE;
const ERR_NOT_FOUND = 'Nothing was found';
const ITEMS_PER_PAGE = 10;
const ITEMS_COUNT = 5;

vi.mock('./index.ts', async importOriginal => {
  const actual = await importOriginal<typeof import('./index.ts')>();
  return {
    ...actual,
    getPersistedQuery: vi.fn(() => storeMock.query),
    setPersistedQuery: vi.fn((value: string) => (storeMock.query = value)),
  };
});
vi.mock('@services/api.ts', async importOriginal => {
  const actual = await importOriginal<typeof import('@services/api.ts')>();
  return {
    ...actual,
    getCharactersByName: vi.fn(async (query?: string): Promise<CharacterInfo[]> => {
      return query === INVALID_QUERY
        ? Promise.reject(Error(ERR_NOT_FOUND))
        : Promise.resolve(getCharacterInfosMock(query ? ITEMS_COUNT : ITEMS_PER_PAGE));
    }),
  };
});
const componentDidMountMock = vi.spyOn(MainPage.prototype, 'componentDidMount');
const setStateMock = vi.spyOn(MainPage.prototype, 'setState');

describe('MainPage', () => {
  it(`Makes initial API call on component mount`, async () => {
    await act(() => render(<MainPage />));

    expect(componentDidMountMock).toHaveBeenCalled();
    expect(setStateMock).toHaveBeenCalled();
    expect(getPersistedQuery).toHaveBeenCalled();
    expect(getCharactersByName).toHaveBeenCalled();
  });

  it(`Handles search term from localStorage on initial load`, async () => {
    setPersistedQuery(FAKE_VALUE);
    await act(() => render(<MainPage />));

    expect(getPersistedQuery).toHaveBeenCalled();
    expect(getCharactersByName).toHaveBeenCalledWith(FAKE_VALUE);
  });

  it(`Shows loading state while fetching data`, async () => {
    await act(() => render(<MainPage />));
    expect(getNestedChild('Loader')).toBeInTheDocument();
  });

  it(`Calls API with correct parameters`, async () => {
    await act(() => render(<MainPage />));

    await act(() => {
      changeInput(getNestedChild('SearchBarInput'), FAKE_VALUE);
      return clickElement(getNestedChild('SearchBarBtn'));
    });
    expect(setPersistedQuery).toHaveBeenCalledWith(FAKE_VALUE);
    expect(getCharactersByName).toHaveBeenCalledWith(FAKE_VALUE);
  });

  it(`Calls API with correct parameters`, async () => {
    await act(() => render(<MainPage />));

    await act(() => {
      return changeInput(getNestedChild('SearchBarInput'), '');
    });
    expect(setPersistedQuery).toHaveBeenCalledWith('');
    expect(getCharactersByName).toHaveBeenCalledWith('');
  });

  it(`Handles successful API responses`, async () => {
    setPersistedQuery(VALID_QUERY);
    await act(() => render(<MainPage />));

    await act(() => vi.runAllTimers());
    expect(getCharactersByName).toHaveBeenCalledWith(VALID_QUERY);
    expect(getNestedChild('CardList').children).toHaveLength(ITEMS_COUNT);
  });

  it(`Handles empty query response`, async () => {
    setPersistedQuery('');
    await act(() => render(<MainPage />));

    await act(() => vi.runAllTimers());
    expect(getCharactersByName).toHaveBeenCalledWith('');
    expect(getNestedChild('CardList').children).toHaveLength(ITEMS_PER_PAGE);
  });

  it(`Handles no results found`, async () => {
    setPersistedQuery(INVALID_QUERY);
    await act(() => render(<MainPage />));

    await act(() => vi.runAllTimers());
    expect(getCharactersByName).toHaveBeenCalledWith(INVALID_QUERY);
    const searchError = getNestedChild('SearchError');
    expect(getNestedChild(searchError, 'SearchErrorIcon')).toBeInTheDocument();
    expect(getNestedChild(searchError, 'SearchErrorMessage').textContent).toMatch(ERR_NOT_FOUND);
  });
});
