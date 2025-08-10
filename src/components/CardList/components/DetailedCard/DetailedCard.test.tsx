import { act, render, screen } from '@testing-library/react';
import { clickElement, getNestedChild } from 'src/test-utils/index.ts';
import { characterMock } from 'src/test-utils/mocks/character-mock.ts';
import { mockUseAppCustomSearchResult } from 'src/test-utils/mocks/mockUseCustomSearchParams.ts';
import { ProvidersMock } from 'src/test-utils/mocks/provider-mock.tsx';
import { mockUseGetCharacterByIdQuery } from 'src/test-utils/mocks/redux-api-mock.ts';
import { mockUseOutletContext } from 'src/test-utils/mocks/router-dom-mock.tsx';
import { vi } from 'vitest';
import { DetailedCard } from './DetailedCard.tsx';

const renderCard = async (): Promise<void> => {
  act(() => render(<DetailedCard />, { wrapper: ProvidersMock }));
  return Promise.resolve();
};

describe('DetailedCard', () => {
  const detailsId = 12;
  const { deleteParams } = mockUseAppCustomSearchResult;
  const { name, image } = characterMock;

  it(`Renders card if valid id is specified`, async () => {
    vi.mocked(mockUseOutletContext).mockReturnValue({ detailsId });
    vi.mocked(mockUseGetCharacterByIdQuery).mockReturnValueOnce({
      refetch: vi.fn(),
      data: characterMock,
    });
    await renderCard();

    expect(mockUseGetCharacterByIdQuery).toHaveBeenCalledWith(detailsId);

    await act(() => vi.runAllTimers());
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', image);
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(getNestedChild('DetailedCardDesc')).toBeInTheDocument();
  });

  it(`Displays error correctly`, async () => {
    const ERR_NOT_FOUND = 'not found';
    vi.mocked(mockUseOutletContext).mockReturnValue({ detailsId });
    vi.mocked(mockUseGetCharacterByIdQuery).mockReturnValueOnce({
      refetch: vi.fn(),
      error: { message: ERR_NOT_FOUND },
    });
    await renderCard();
    await act(() => vi.runAllTimers());
    expect(screen.getByText(RegExp(ERR_NOT_FOUND))).toBeInTheDocument();
  });

  it(`Displays loader`, async () => {
    vi.mocked(mockUseOutletContext).mockReturnValue({ detailsId });
    vi.mocked(mockUseGetCharacterByIdQuery).mockReturnValueOnce({
      refetch: vi.fn(),
      isFetching: true,
    });
    await renderCard();
    expect(getNestedChild('Loader')).toBeInTheDocument();
  });

  it(`Handles button clicks correctly`, async () => {
    const mockRefetch = vi.fn();
    vi.mocked(mockUseOutletContext).mockReturnValue({ detailsId });
    vi.mocked(mockUseGetCharacterByIdQuery).mockReturnValueOnce({
      refetch: mockRefetch,
    });
    await renderCard();
    await act(() => vi.runAllTimers());

    clickElement(getNestedChild('RefreshBtn'));
    expect(mockRefetch).toHaveBeenCalled();

    clickElement(getNestedChild('CloseBtn'));
    expect(deleteParams).toHaveBeenCalledWith('details');
  });

  it(`Displays nothing if empty id is specified`, async () => {
    vi.mocked(mockUseOutletContext).mockReturnValue({});
    vi.mocked(mockUseGetCharacterByIdQuery).mockReturnValueOnce({ refetch: vi.fn() });
    await renderCard();
    expect(screen.queryByRole('article')).toBeNull();
  });
});
