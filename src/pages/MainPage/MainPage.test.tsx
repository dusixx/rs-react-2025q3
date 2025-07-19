/* eslint-disable @typescript-eslint/consistent-type-imports */
import { CharacterInfo } from '@services/types.ts';
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

const VALID_QUERY = 'rick';
const INVALID_QUERY = FAKE_VALUE;
const ERR_NOT_FOUND = 'Nothing was found';
const ITEMS_PER_PAGE = 10;
const ITEMS_COUNT = 5;
const store = {
  query: '',
};
const mockedApi = vi.hoisted(() => {
  return {
    getCharactersByNameMock: vi.fn(async (query?: string): Promise<CharacterInfo[]> => {
      return query === INVALID_QUERY
        ? Promise.reject(Error(ERR_NOT_FOUND))
        : Promise.resolve(getCharacterInfosMock(query ? ITEMS_COUNT : ITEMS_PER_PAGE));
    }),
    getPersistedQueryMock: vi.fn(() => store.query),
    setPersistedQueryMock: vi.fn((value: string) => {
      store.query = value;
    }),
  };
});
vi.mock('./index.ts', async importOriginal => {
  const original = await importOriginal<typeof import('./index.ts')>();
  return {
    ...original,
    getPersistedQuery: mockedApi.getPersistedQueryMock,
    setPersistedQuery: mockedApi.setPersistedQueryMock,
  };
});
vi.mock('@services/api.ts', async importOriginal => {
  const original = await importOriginal<typeof import('@services/api.ts')>();
  return {
    ...original,
    getCharactersByName: mockedApi.getCharactersByNameMock,
  };
});
const componentDidMountMock = vi.spyOn(MainPage.prototype, 'componentDidMount');
const setStateMock = vi.spyOn(MainPage.prototype, 'setState');

describe('MainPage', () => {
  const { getCharactersByNameMock, getPersistedQueryMock, setPersistedQueryMock } = mockedApi;

  it(`Makes initial API call on component mount`, async () => {
    await act(() => render(<MainPage />));

    expect(componentDidMountMock).toHaveBeenCalled();
    expect(setStateMock).toHaveBeenCalled();
    expect(getPersistedQueryMock).toHaveBeenCalled();
    expect(getCharactersByNameMock).toHaveBeenCalled();
  });

  it(`Handles search term from localStorage on initial load`, async () => {
    setPersistedQueryMock(FAKE_VALUE);
    await act(() => render(<MainPage />));

    expect(getPersistedQueryMock).toHaveBeenCalled();
    expect(getCharactersByNameMock).toHaveBeenCalledWith(FAKE_VALUE);
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
    expect(setPersistedQueryMock).toHaveBeenCalledWith(FAKE_VALUE);
    expect(getCharactersByNameMock).toHaveBeenCalledWith(FAKE_VALUE);
  });

  it(`Handles successful API responses`, async () => {
    setPersistedQueryMock(VALID_QUERY);
    await act(() => render(<MainPage />));

    await act(() => vi.runAllTimers());
    expect(getCharactersByNameMock).toHaveBeenCalledWith(VALID_QUERY);
    expect(getNestedChild('CardList').children).toHaveLength(ITEMS_COUNT);
  });

  it(`Handles empty query response`, async () => {
    setPersistedQueryMock('');
    await act(() => render(<MainPage />));

    await act(() => vi.runAllTimers());
    expect(getCharactersByNameMock).toHaveBeenCalledWith('');
    expect(getNestedChild('CardList').children).toHaveLength(ITEMS_PER_PAGE);
  });

  it(`Handles no results found`, async () => {
    setPersistedQueryMock(INVALID_QUERY);
    await act(() => render(<MainPage />));

    await act(() => vi.runAllTimers());
    expect(getCharactersByNameMock).toHaveBeenCalledWith(INVALID_QUERY);
    const searchError = getNestedChild('SearchError');
    expect(getNestedChild(searchError, 'SearchErrorIcon')).toBeInTheDocument();
    expect(getNestedChild(searchError, 'SearchErrorMessage').textContent).toMatch(ERR_NOT_FOUND);
  });
});
