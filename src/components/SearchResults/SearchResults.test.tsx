import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { TestId } from 'src/test-utils/constants.ts';
import { ERR_NOT_FOUND, getCharactersByNameMock } from 'src/test-utils/mocks/api-mock.ts';
import { getCharacterInfoListMock } from 'src/test-utils/mocks/character-mock.ts';
import { mockUseCustomSearchResult } from 'src/test-utils/mocks/mockUseCustomSearchParams.ts';
import { outletMock } from 'src/test-utils/mocks/router-dom-mock.tsx';
import { clickElement, getNestedChild } from 'src/test-utils/utils.ts';
import { vi } from 'vitest';
import type { SearchResultsProps } from './SearchResults.tsx';
import { SearchResults } from './SearchResults.tsx';

vi.mock('./SearchResults.module.scss', () => ({
  default: {
    list: 'mock-list',
  },
}));
const renderResults = async (props: SearchResultsProps = { query: '' }): Promise<void> => {
  await act(() =>
    render(
      <MemoryRouter>
        <SearchResults {...props} />
      </MemoryRouter>,
    ),
  );
};
const ITEMS_COUNT = 10;
const SEARCH_RESULT = {
  info: {
    pages: 20,
    count: ITEMS_COUNT,
    next: null,
    prev: null,
  },
  results: getCharacterInfoListMock(ITEMS_COUNT),
};

describe('SearchResults', () => {
  const { getParams, createParams } = mockUseCustomSearchResult;

  it(`Displays results if valid params specified`, async () => {
    const name = 'rick';
    const page = 3;
    vi.mocked(getParams)?.mockReturnValue([]);
    vi.mocked(getCharactersByNameMock).mockReturnValueOnce(Promise.resolve(SEARCH_RESULT));
    await renderResults({ query: name, page });

    expect(getCharactersByNameMock).toHaveBeenCalledWith(name, page);
    await act(() => vi.runAllTimers());
    expect(getNestedChild('CardList')).toHaveProperty('children.length', ITEMS_COUNT);
  });

  it(`Displays error if invalid params specified`, async () => {
    vi.mocked(getParams)?.mockReturnValue([]);
    vi.mocked(getCharactersByNameMock).mockReturnValueOnce(Promise.reject(Error(ERR_NOT_FOUND)));
    await renderResults();
    await act(() => vi.runAllTimers());
    expect(screen.getByText(RegExp(ERR_NOT_FOUND))).toBeInTheDocument();
  });

  it(`Displays loader`, async () => {
    vi.mocked(getParams)?.mockReturnValue([]);
    await renderResults();
    expect(getNestedChild('Loader')).toBeInTheDocument();
  });

  it(`Displays details if valid id is specified`, async () => {
    vi.mocked(outletMock).mockReturnValue(<div data-testid={TestId.SearchResultsOutlet}></div>);
    vi.mocked(getParams)?.mockReturnValue(['1']);
    await renderResults();

    await act(() => vi.runAllTimers());
    expect(getNestedChild('CardList')).toHaveClass('mock-list');
    expect(getNestedChild('SearchResultsOutlet')).toBeInTheDocument();
  });

  it(`Handles paginator buttons click`, async () => {
    const name = 'ed';
    const page = 4;
    vi.mocked(getParams)?.mockReturnValue(['1']);
    vi.mocked(getCharactersByNameMock).mockReturnValueOnce(Promise.resolve(SEARCH_RESULT));
    await renderResults({ query: name, page });

    clickElement(getNestedChild('PaginatorNextBtn'));
    expect(createParams).toHaveBeenCalledWith({ page: (page + 1).toString(), q: name });
  });
});
