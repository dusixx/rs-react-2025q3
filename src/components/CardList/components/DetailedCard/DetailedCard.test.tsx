import { act, render, screen } from '@testing-library/react';
import { rndInt } from '@utils/index.ts';
import { clickElement, getNestedChild } from 'src/test-utils/index.ts';
import { ERR_NOT_FOUND, getCharacterByIdMock } from 'src/test-utils/mocks/api-mock.ts';
import { characterMock } from 'src/test-utils/mocks/character-mock.ts';
import { mockUseAppCustomSearchResult } from 'src/test-utils/mocks/mockUseCustomSearchParams.ts';
import { vi } from 'vitest';
import { DetailedCard } from './DetailedCard.tsx';

const renderCard = async (): Promise<void> => {
  await act(() => render(<DetailedCard />));
};

describe('DetailedCard', () => {
  const { getParams, deleteParams } = mockUseAppCustomSearchResult;
  const { name, image } = characterMock;

  it(`Renders card if valid id is specified`, async () => {
    const id = rndInt(1, 100).toString();
    vi.mocked(getParams)?.mockReturnValue([id]);
    await renderCard();

    expect(getParams).toHaveBeenCalledWith('details');
    expect(getCharacterByIdMock).toHaveBeenCalledWith(id);

    await act(() => vi.runAllTimers());
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', image);
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(getNestedChild('DetailedCardDesc')).toBeInTheDocument();
  });

  it(`Displays error if invalid id is specified`, async () => {
    const id = '-1';
    vi.mocked(getParams)?.mockReturnValue([id]);
    await renderCard();

    expect(getParams).toHaveBeenCalledWith('details');
    expect(getCharacterByIdMock).toHaveBeenCalledWith(id);

    await act(() => vi.runAllTimers());
    expect(screen.getByText(RegExp(ERR_NOT_FOUND))).toBeInTheDocument();
  });

  it(`Displays loader`, async () => {
    const id = '1';
    vi.mocked(getParams)?.mockReturnValue([id]);
    await renderCard();
    expect(getNestedChild('Loader')).toBeInTheDocument();
  });

  it(`Closes on button click`, async () => {
    vi.mocked(getParams)?.mockReturnValue(['1']);
    await renderCard();
    await act(() => vi.runAllTimers());
    expect(screen.getByRole('article')).toBeInTheDocument();
    clickElement(screen.getByRole('button'));
    expect(deleteParams).toHaveBeenCalledWith('details');
  });

  it(`Displays nothing if empty id is specified`, async () => {
    vi.mocked(getParams)?.mockReturnValue(['']);
    await renderCard();
    expect(screen.queryByRole('article')).toBeNull();
    expect(getCharacterByIdMock).not.toHaveBeenCalled();
  });
});
