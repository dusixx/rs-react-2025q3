/* eslint-disable max-lines-per-function */
import { ERR_SOMETHING_WRONG } from '@common/constants/index.ts';
import { act, render, screen } from '@testing-library/react';
import { TestId } from 'src/test-utils/constants.ts';
import {
  ITEMS_PER_PAGE,
  PAGES_COUNT,
  searchResultMock,
} from 'src/test-utils/mocks/character-mock.ts';
import { mockUseAppCustomSearchResult } from 'src/test-utils/mocks/mockUseCustomSearchParams.ts';
import { ProvidersMock } from 'src/test-utils/mocks/provider-mock.tsx';
import { mockUseGetCharactersByNameQuery } from 'src/test-utils/mocks/redux-api-mock.ts';
import { outletElementMock } from 'src/test-utils/mocks/router-dom-mock.tsx';
import { clickElement, getNestedChild } from 'src/test-utils/utils.ts';
import { vi } from 'vitest';
import { SearchResults } from './SearchResults.tsx';

vi.mock('./SearchResults.module.scss', () => ({
  default: {
    list: 'mock-list',
  },
}));
const renderResults = async (): Promise<void> => {
  await act(() => {
    render(<SearchResults />, { wrapper: ProvidersMock });
    return Promise.resolve();
  });
};

describe('SearchResults', () => {
  const { getParams, createParams, setParams } = mockUseAppCustomSearchResult;
  const [name, page] = ['rick', 3];

  it(`Displays results if valid params specified`, async () => {
    vi.mocked(getParams)?.mockReturnValueOnce(['1', String(page), name]);
    const refetch = vi.fn();

    vi.mocked(mockUseGetCharactersByNameQuery).mockReturnValueOnce({
      refetch,
      data: searchResultMock,
    });
    await renderResults();

    expect(mockUseGetCharactersByNameQuery).toHaveBeenCalledWith({ name, page: String(page) });
    expect(refetch).toHaveBeenCalled();

    await act(() => vi.runAllTimers());

    expect(getNestedChild('CardList')).toHaveProperty('children.length', ITEMS_PER_PAGE);
    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(ITEMS_PER_PAGE);

    clickElement(cards[0]);
    expect(setParams).toHaveBeenCalledWith({ details: 1 });

    clickElement(getNestedChild('RefreshBtn'));
    expect(refetch).toHaveBeenCalled();
  });

  it(`Displays error if invalid params specified`, async () => {
    const ERR_NOT_FOUND = 'not found';
    vi.mocked(mockUseGetCharactersByNameQuery).mockReturnValueOnce({
      refetch: vi.fn(),
      error: { message: ERR_NOT_FOUND },
      isError: true,
    });
    await renderResults();
    await act(() => vi.runAllTimers());
    expect(screen.getByText(RegExp(ERR_NOT_FOUND))).toBeInTheDocument();
  });

  it(`Displays error if empty results where received`, async () => {
    const data = { ...searchResultMock, results: [] };
    vi.mocked(mockUseGetCharactersByNameQuery).mockReturnValueOnce({
      refetch: vi.fn(),
      data,
    });
    await renderResults();
    await act(() => vi.runAllTimers());
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

  it(`Displays details if valid id is specified`, async () => {
    vi.mocked(getParams)?.mockReturnValue(['1']);
    vi.mocked(mockUseGetCharactersByNameQuery).mockReturnValueOnce({
      refetch: vi.fn(),
      data: searchResultMock,
    });
    vi.mocked(outletElementMock).mockReturnValue(
      <div data-testid={TestId.SearchResultsOutlet}></div>,
    );
    await renderResults();

    await act(() => vi.runAllTimers());
    expect(getNestedChild('CardList')).toHaveClass('mock-list');
    expect(getNestedChild('SearchResultsOutlet')).toBeInTheDocument();
  });

  it(`Handles paginator buttons click`, async () => {
    vi.mocked(mockUseGetCharactersByNameQuery).mockReturnValueOnce({
      refetch: vi.fn(),
      data: searchResultMock,
    });
    vi.mocked(getParams)?.mockReturnValue(['1', String(page), name]);
    await renderResults();
    await act(() => vi.runAllTimers());

    clickElement(getNestedChild('PaginatorNextBtn'));
    expect(createParams).toHaveBeenCalledWith({ page: page + 1, q: name });
    clickElement(getNestedChild('PaginatorPrevBtn'));
    expect(createParams).toHaveBeenCalledWith({ page, q: name });
    clickElement(getNestedChild('PaginatorFirstBtn'));
    expect(createParams).toHaveBeenCalledWith({ page: 1, q: name });
    clickElement(getNestedChild('PaginatorLastBtn'));
    expect(createParams).toHaveBeenCalledWith({ page: PAGES_COUNT, q: name });
  });
});
