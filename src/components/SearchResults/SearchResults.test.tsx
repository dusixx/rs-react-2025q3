import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { TestId } from 'src/test-utils/constants.ts';
import { ERR_NOT_FOUND, getCharactersByNameMock } from 'src/test-utils/mocks/api-mock.ts';
import { ITEMS_PER_PAGE, PAGES_COUNT } from 'src/test-utils/mocks/character-mock.ts';
import { mockUseCustomSearchResult } from 'src/test-utils/mocks/mockUseCustomSearchParams.ts';
import { outletElementMock } from 'src/test-utils/mocks/router-dom-mock.tsx';
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

describe('SearchResults', () => {
  const { getParams, createParams } = mockUseCustomSearchResult;
  const [name, page] = ['rick', 3];

  beforeEach(() => {
    vi.mocked(getParams)?.mockReturnValue([]);
  });

  it(`Displays results if valid params specified`, async () => {
    await renderResults({ query: name, page });
    expect(getCharactersByNameMock).toHaveBeenCalledWith(name, page);
    await act(() => vi.runAllTimers());
    expect(getNestedChild('CardList')).toHaveProperty('children.length', ITEMS_PER_PAGE);
  });

  it(`Displays error if invalid params specified`, async () => {
    vi.mocked(getCharactersByNameMock).mockReturnValueOnce(Promise.reject(Error(ERR_NOT_FOUND)));
    await renderResults();
    await act(() => vi.runAllTimers());
    expect(screen.getByText(RegExp(ERR_NOT_FOUND))).toBeInTheDocument();
  });

  it(`Displays loader`, async () => {
    await renderResults();
    expect(getNestedChild('Loader')).toBeInTheDocument();
  });

  it(`Displays details if valid id is specified`, async () => {
    vi.mocked(outletElementMock).mockReturnValue(
      <div data-testid={TestId.SearchResultsOutlet}></div>,
    );
    vi.mocked(getParams)?.mockReturnValue(['1']);
    await renderResults();
    await act(() => vi.runAllTimers());

    expect(getNestedChild('CardList')).toHaveClass('mock-list');
    expect(getNestedChild('SearchResultsOutlet')).toBeInTheDocument();
  });

  it(`Handles paginator buttons click`, async () => {
    vi.mocked(getParams)?.mockReturnValue(['1']);
    await renderResults({ query: name, page });
    await act(() => vi.runAllTimers());

    clickElement(getNestedChild('PaginatorNextBtn'));
    expect(createParams).toHaveBeenCalledWith({ page: (page + 1).toString(), q: name });
    clickElement(getNestedChild('PaginatorPrevBtn'));
    expect(createParams).toHaveBeenCalledWith({ page: page.toString(), q: name });
    clickElement(getNestedChild('PaginatorFirstBtn'));
    expect(createParams).toHaveBeenCalledWith({ page: '1', q: name });
    clickElement(getNestedChild('PaginatorLastBtn'));
    expect(createParams).toHaveBeenCalledWith({ page: PAGES_COUNT.toString(), q: name });
  });
});
