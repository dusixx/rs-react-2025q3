import { usersMock } from '@/test-utils/mocks/user-mock.ts';
import { render } from '@testing-library/react';
import { FAKE_VALUE, getNestedChild } from 'src/test-utils/index.ts';
import { ProvidersMock } from 'src/test-utils/mocks/provider-mock.tsx';
import { CardList } from './CardList.tsx';

describe('CardList', () => {
  it(`Renders correctly`, () => {
    render(<CardList users={usersMock} className={FAKE_VALUE} />, { wrapper: ProvidersMock });
    const list = getNestedChild('CardList');
    expect(list).toHaveClass(FAKE_VALUE);
    expect(list).toHaveProperty('children.length', Object.keys(usersMock).length);
  });
});
