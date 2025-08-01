import { render } from '@testing-library/react';
import { getNestedChild } from 'src/test-utils/index.ts';
import { getCharacterInfoListMock } from 'src/test-utils/mocks/character-mock.ts';
import { ProvidersMock } from 'src/test-utils/mocks/provider-mock.tsx';
import { CardList } from './CardList.tsx';

const MIN_ITEMS_COUNT = 1;
const ITEMS_PER_PAGE = 10;

describe('CardList', () => {
  it(`Renders correct number of items when data is provided`, () => {
    const infos = getCharacterInfoListMock(MIN_ITEMS_COUNT, ITEMS_PER_PAGE);
    render(<CardList infos={infos} />, { wrapper: ProvidersMock });
    expect(getNestedChild('CardList')).toHaveProperty('children.length', infos.length);
  });
});
