import { ERR_SOMETHING_WRONG } from '@common/constants/index.ts';
import { act, render, screen } from '@testing-library/react';
import { rickmortyApi } from 'src/redux/api/api.ts';
import { searchResultMock } from 'src/test-utils/mocks/character-mock.ts';
import { mockUseAppCustomSearchResult } from 'src/test-utils/mocks/mockUseCustomSearchParams.ts';
import { ProvidersMock } from 'src/test-utils/mocks/provider-mock.tsx';
import {
  appDispatchMock,
  mockUseGetCharactersByNameQuery,
} from 'src/test-utils/mocks/redux-mock.ts';
import { clickElement, getNestedChild } from 'src/test-utils/utils.ts';
import { vi } from 'vitest';
import { SearchResults } from './SearchResults.tsx';

const { getParams, createParams, setParams } = mockUseAppCustomSearchResult;
const [name, page] = ['rick', 3];

const renderResults = async (): Promise<void> => {
  await act(() => {
    render(<SearchResults />, { wrapper: ProvidersMock });
    return Promise.resolve();
  });
};

describe('SearchResults', () => {
  it(`Displays results if valid params specified`, async () => {
    vi.mocked(mockUseGetCharactersByNameQuery).mockReturnValueOnce({
      refetch: vi.fn(),
      data: searchResultMock,
    });
    await renderResults();
    const cards = screen.getAllByRole('article');
    clickElement(cards[0]);
    expect(setParams).toHaveBeenCalledWith({ details: 1 });
  });

  it(`Handles button clicks correctly`, async () => {
    const refetch = vi.fn();

    vi.mocked(mockUseGetCharactersByNameQuery).mockReturnValueOnce({
      refetch,
      data: searchResultMock,
    });
    await renderResults();

    clickElement(getNestedChild('RefreshBtn'));
    expect(refetch).toHaveBeenCalled();

    clickElement(getNestedChild('InvalidateBtn'));
    expect(appDispatchMock).toHaveBeenCalledWith({
      payload: ['name'],
      type: rickmortyApi.util.invalidateTags.type,
    });
  });

  it(`Displays error if invalid params specified`, async () => {
    const ERR_NOT_FOUND = 'not found';
    vi.mocked(mockUseGetCharactersByNameQuery).mockReturnValueOnce({
      refetch: vi.fn(),
      error: { message: ERR_NOT_FOUND },
      isError: true,
    });
    await renderResults();
    expect(screen.getByText(RegExp(ERR_NOT_FOUND))).toBeInTheDocument();
  });

  it(`Displays error if empty results where received`, async () => {
    const data = { ...searchResultMock, results: [] };
    vi.mocked(mockUseGetCharactersByNameQuery).mockReturnValueOnce({
      refetch: vi.fn(),
      data,
    });
    await renderResults();
    expect(screen.getByText(RegExp(ERR_SOMETHING_WRONG))).toBeInTheDocument();
  });

  it(`Displays loader`, async () => {
    vi.mocked(mockUseGetCharactersByNameQuery).mockReturnValueOnce({
      refetch: vi.fn(),
      isFetching: true,
    });
    await renderResults();
    expect(getNestedChild('Loader')).toBeInTheDocument();
  });

  it(`Handles paginator buttons click`, async () => {
    vi.mocked(mockUseGetCharactersByNameQuery).mockReturnValueOnce({
      refetch: vi.fn(),
      data: searchResultMock,
    });
    vi.mocked(getParams)?.mockReturnValue(['1', String(page), name]);
    await renderResults();
    clickElement(getNestedChild('PaginatorFirstBtn'));
    expect(createParams).toHaveBeenCalledWith({ page: 1, q: name });
  });
});
