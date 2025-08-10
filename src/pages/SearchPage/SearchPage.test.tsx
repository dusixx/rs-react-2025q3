import { INITIAL_PAGE, LocalStorageKey } from '@common/constants/index.ts';
import { render } from '@testing-library/react';
import { act } from 'react';
import { FAKE_VALUE } from 'src/test-utils/constants.ts';
import { localStorageMock } from 'src/test-utils/mocks/local-storage-mock.ts';
import { mockUseAppCustomSearchResult } from 'src/test-utils/mocks/mockUseCustomSearchParams.ts';
import { ProvidersMock } from 'src/test-utils/mocks/provider-mock.tsx';
import { getNestedChild } from 'src/test-utils/utils.ts';
import { vi } from 'vitest';
import SearchPage from './SearchPage.tsx';

const renderPage = async (): Promise<void> => {
  await act(() => {
    render(<SearchPage />, { wrapper: ProvidersMock });
    return Promise.resolve();
  });
};

describe('SearchPage', () => {
  const { setItem, getItem } = localStorageMock;
  const { createParams, hasParams } = mockUseAppCustomSearchResult;

  it(`Handles search term from localStorage on initial load`, async () => {
    vi.mocked(hasParams)?.mockReturnValueOnce(false);
    setItem(LocalStorageKey.LastQuery, FAKE_VALUE);
    await renderPage();
    expect(createParams).toHaveBeenCalledWith({ q: FAKE_VALUE, page: INITIAL_PAGE });
    expect(getItem).toHaveBeenCalledWith(LocalStorageKey.LastQuery);
    expect(getItem).toHaveReturnedWith(FAKE_VALUE);
    expect(
      getNestedChild('SearchPage', 'SearchBar', 'SearchBarBtn', 'SearchBarBtnIcon'),
    ).toBeInTheDocument();
  });
});
