import { INITIAL_PAGE, LS_KEY_LAST_QUERY } from '@common/constants.ts';
import { render } from '@testing-library/react';
import { act } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { FAKE_VALUE } from 'src/test-utils/constants.ts';
import {
  ERR_NOT_FOUND,
  getCharactersByNameMock,
  INVALID_QUERY,
} from 'src/test-utils/mocks/api-mock.ts';
import { ITEMS_PER_PAGE } from 'src/test-utils/mocks/character-mock.ts';
import { localStorageMock } from 'src/test-utils/mocks/local-storage-mock.ts';
import { changeInput, clickElement, getNestedChild } from 'src/test-utils/utils.ts';
import { vi } from 'vitest';
import SearchPage from './SearchPage.tsx';

const renderPage = async (): Promise<void> => {
  await act(() =>
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>,
    ),
  );
};

describe('SearchPage', () => {
  const { setItem, getItem } = localStorageMock;

  it(`Handles search term from localStorage on initial load`, async () => {
    setItem(LS_KEY_LAST_QUERY, FAKE_VALUE);
    await renderPage();
    expect(getItem).toHaveBeenCalledWith(LS_KEY_LAST_QUERY);
    expect(getItem).toHaveReturnedWith(FAKE_VALUE);
  });

  it(`Calls API with correct parameters`, async () => {
    await renderPage();
    await act(() => {
      changeInput(getNestedChild('SearchBarInput'), FAKE_VALUE);
      return clickElement(getNestedChild('SearchBarBtn'));
    });
    expect(setItem).toHaveBeenCalledWith(LS_KEY_LAST_QUERY, FAKE_VALUE);
    expect(getCharactersByNameMock).toHaveBeenCalledWith(FAKE_VALUE, INITIAL_PAGE);
  });

  it(`Handles empty query response`, async () => {
    setItem(LS_KEY_LAST_QUERY, '');
    await renderPage();
    await act(() => vi.runAllTimers());
    expect(getCharactersByNameMock).toHaveBeenCalledWith('', INITIAL_PAGE);
    expect(getNestedChild('CardList')).toHaveProperty('children.length', ITEMS_PER_PAGE);
  });

  it(`Handles invalid query`, async () => {
    setItem(LS_KEY_LAST_QUERY, INVALID_QUERY);
    await renderPage();
    await act(() => vi.runAllTimers());
    expect(getCharactersByNameMock).toHaveBeenCalledWith(INVALID_QUERY, INITIAL_PAGE);
    expect(getNestedChild('ErrorInfo', 'ErrorInfoIcon')).toBeInTheDocument();
    expect(getNestedChild('ErrorInfo', 'ErrorInfoMessage')).toHaveTextContent(ERR_NOT_FOUND);
  });
});
