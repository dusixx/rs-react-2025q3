/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { render, within } from '@testing-library/react';
import { addInfo, removeInfo } from 'src/redux/charactersSlice.ts';
import { clickElement, getNestedChild } from 'src/test-utils/index.ts';
import { getCharacterInfoListMock } from 'src/test-utils/mocks/character-mock.ts';
import { ProvidersMock } from 'src/test-utils/mocks/provider-mock.tsx';
import { appDispatchMock, mockUseSelectedInfos } from 'src/test-utils/mocks/redux-hook-mock.ts';
import { vi } from 'vitest';
import { CardList } from './CardList.tsx';

const ITEMS_PER_PAGE = 10;

describe('CardList', () => {
  it(`Renders correct number of items when data is provided`, () => {
    const infos = getCharacterInfoListMock(ITEMS_PER_PAGE, ITEMS_PER_PAGE);
    vi.mocked(mockUseSelectedInfos).mockReturnValueOnce(infos);
    render(<CardList infos={infos} />, { wrapper: ProvidersMock });
    expect(getNestedChild('CardList')).toHaveProperty('children.length', infos.length);
  });

  it(`Removes selected card from the store`, () => {
    const infos = getCharacterInfoListMock(ITEMS_PER_PAGE, ITEMS_PER_PAGE);
    vi.mocked(mockUseSelectedInfos).mockReturnValueOnce(infos);
    render(<CardList infos={infos} />, { wrapper: ProvidersMock });

    const cardList = getNestedChild('CardList');
    const firstCard = cardList.children[0] as HTMLElement;
    const checkbox = within(firstCard).getByRole('checkbox');

    clickElement(checkbox);
    expect(appDispatchMock).toHaveBeenCalledWith({
      payload: infos[0],
      type: removeInfo.type,
    });
  });

  it(`Adds selected card to the store`, () => {
    const infos = getCharacterInfoListMock(ITEMS_PER_PAGE, ITEMS_PER_PAGE);
    vi.mocked(mockUseSelectedInfos).mockReturnValueOnce([]);
    render(<CardList infos={infos} />, { wrapper: ProvidersMock });

    const cardList = getNestedChild('CardList');
    const firstCard = cardList.children[0] as HTMLElement;
    const checkbox = within(firstCard).getByRole('checkbox');

    clickElement(checkbox);
    expect(appDispatchMock).toHaveBeenCalledWith({
      payload: infos[0],
      type: addInfo.type,
    });
  });
});
