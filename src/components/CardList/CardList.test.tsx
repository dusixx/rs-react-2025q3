import { render } from '@testing-library/react';
import { getCharacterInfosMock, getNestedChild } from 'src/test-utils/index.ts';
import { CardList } from './CardList.tsx';

describe('CardList', () => {
  it(`Renders correct number of items when data is provided`, () => {
    const infos = getCharacterInfosMock(5, 20);
    render(<CardList infos={infos} />);
    expect(getNestedChild('CardList').children).toHaveLength(infos.length);
  });
});
