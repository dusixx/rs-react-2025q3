import { render } from '@testing-library/react';
import { getNestedChild } from 'src/test-utils/index.ts';
import { getCharacterInfosMock, ITEMS_PER_PAGE } from 'src/test-utils/mocks/character-mock.ts';
import { ProvidersMock } from 'src/test-utils/mocks/provider-mock.tsx';
import { mockUseSelectedInfos } from 'src/test-utils/mocks/redux-mock.ts';
import { vi } from 'vitest';
import { CardList } from './CardList.tsx';

const { array: infosArray, record: infosRecord } = getCharacterInfosMock(ITEMS_PER_PAGE);

describe('CardList', () => {
  it(`Renders correct number of items when data is provided`, () => {
    vi.mocked(mockUseSelectedInfos).mockReturnValueOnce(infosRecord);
    render(<CardList infos={infosArray} />, { wrapper: ProvidersMock });
    expect(getNestedChild('CardList')).toHaveProperty('children.length', infosArray.length);
  });
});
