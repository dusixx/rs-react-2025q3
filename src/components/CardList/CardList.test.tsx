import { render } from '@testing-library/react';
import { getCharacterInfosMock, getNestedChild } from 'src/test-utils/index.ts';
import { CardList } from './CardList.tsx';

const MIN_ITEMS_COUNT = 1;
const ITEMS_PER_PAGE = 10;

describe('CardList', () => {
  it(`Renders correct number of items when data is provided`, () => {
    const infos = getCharacterInfosMock(MIN_ITEMS_COUNT, ITEMS_PER_PAGE);
    render(<CardList infos={infos} />);
    expect(getNestedChild('CardList').children).toHaveLength(infos.length);
  });
});
