import { render } from '@testing-library/react';
import { act } from 'react';
import { changeInput, clickElement, FAKE_VALUE, getNestedChild } from 'src/test-utils/index.ts';
import {
  ERR_NOT_FOUND,
  getCharactersByNameMock,
  INVALID_QUERY,
  ITEMS_COUNT,
  ITEMS_PER_PAGE,
  VALID_QUERY,
} from 'src/test-utils/mocks/api-mock.ts';
import { localStorageMock } from 'src/test-utils/vitest.setup.ts';
import { vi } from 'vitest';
import { LS_KEY_LAST_QUERY } from './MainPage.constants.ts';
import MainPage from './MainPage.tsx';

describe('MainPage', () => {
  const { setItem, getItem } = localStorageMock;

  it(`Handles search term from localStorage on initial load`, async () => {
    setItem(LS_KEY_LAST_QUERY, FAKE_VALUE);
    await act(() => render(<MainPage />));

    expect(getItem).toHaveBeenCalledWith(LS_KEY_LAST_QUERY);
    expect(getItem).toHaveReturnedWith(FAKE_VALUE);
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
    expect(setItem).toHaveBeenCalledWith(LS_KEY_LAST_QUERY, FAKE_VALUE);
    expect(getCharactersByNameMock).toHaveBeenCalledWith(FAKE_VALUE);
  });

  it(`Handles successful API responses`, async () => {
    setItem(LS_KEY_LAST_QUERY, VALID_QUERY);
    await act(() => render(<MainPage />));
    await act(() => vi.runAllTimers());

    expect(getCharactersByNameMock).toHaveBeenCalledWith(VALID_QUERY);
    expect(getNestedChild('CardList')).toHaveProperty('children.length', ITEMS_COUNT);
  });

  it(`Handles empty query response on input change`, async () => {
    await act(() => render(<MainPage />));
    await act(() => changeInput(getNestedChild('SearchBarInput'), ''));
    await act(() => vi.runAllTimers());

    expect(setItem).toHaveBeenCalledWith(LS_KEY_LAST_QUERY, '');
    expect(getCharactersByNameMock).toHaveBeenCalledWith('');
    expect(getNestedChild('CardList')).toHaveProperty('children.length', ITEMS_PER_PAGE);
  });

  it(`Handles invalid query`, async () => {
    setItem(LS_KEY_LAST_QUERY, INVALID_QUERY);
    await act(() => render(<MainPage />));
    await act(() => vi.runAllTimers());

    expect(getCharactersByNameMock).toHaveBeenCalledWith(INVALID_QUERY);
    expect(getNestedChild('SearchError', 'SearchErrorIcon')).toBeInTheDocument();
    expect(getNestedChild('SearchError', 'SearchErrorMessage')).toHaveTextContent(ERR_NOT_FOUND);
  });
});
