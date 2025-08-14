import { render, within } from '@testing-library/react';
import { addInfo, removeInfo } from 'src/redux/store/charactersSlice.ts';
import { clickElement, getNestedChild } from 'src/test-utils/index.ts';
import { getCharacterInfosMock, ITEMS_PER_PAGE } from 'src/test-utils/mocks/character-mock.ts';
import { ProvidersMock } from 'src/test-utils/mocks/provider-mock.tsx';
import { appDispatchMock, mockUseSelectedInfos } from 'src/test-utils/mocks/redux-hook-mock.ts';
import { vi } from 'vitest';
import { CardList } from './CardList.tsx';

const { array: infosArray, record: infosRecord } = getCharacterInfosMock(ITEMS_PER_PAGE);

describe('CardList', () => {
  it(`Renders correct number of items when data is provided`, () => {
    vi.mocked(mockUseSelectedInfos).mockReturnValueOnce(infosRecord);
    render(<CardList infos={infosArray} />, { wrapper: ProvidersMock });
    expect(getNestedChild('CardList')).toHaveProperty('children.length', infosArray.length);
  });

  it(`Removes selected card from the store`, () => {
    vi.mocked(mockUseSelectedInfos).mockReturnValueOnce(infosRecord);
    render(<CardList infos={infosArray} />, { wrapper: ProvidersMock });

    const cardList = getNestedChild('CardList');
    const firstCard = cardList.children[0] as HTMLElement;
    const checkbox = within(firstCard).getByRole('checkbox');

    clickElement(checkbox);
    expect(appDispatchMock).toHaveBeenCalledWith({
      payload: infosArray[0],
      type: removeInfo.type,
    });
  });

  it(`Adds selected card to the store`, () => {
    vi.mocked(mockUseSelectedInfos).mockReturnValueOnce({});
    render(<CardList infos={infosArray} />, { wrapper: ProvidersMock });

    const cardList = getNestedChild('CardList');
    const firstCard = cardList.children[0] as HTMLElement;
    const checkbox = within(firstCard).getByRole('checkbox');

    clickElement(checkbox);
    expect(appDispatchMock).toHaveBeenCalledWith({
      payload: infosArray[0],
      type: addInfo.type,
    });
  });
});
