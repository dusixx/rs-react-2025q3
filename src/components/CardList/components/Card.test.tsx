import { usersArray } from '@/test-utils/mocks/user-mock.ts';
import { render, screen } from '@testing-library/react';
import { FAKE_VALUE } from 'src/test-utils/index.ts';
import { ProvidersMock } from 'src/test-utils/mocks/provider-mock.tsx';
import { Card } from './Card.tsx';

describe('Card', () => {
  it(`Renders correctly`, () => {
    const info = { ...usersArray[0], avatar: FAKE_VALUE };
    render(<Card userInfo={info} className={FAKE_VALUE} />, { wrapper: ProvidersMock });

    const card = screen.getByRole('article');
    expect(card).toHaveClass(FAKE_VALUE);
    expect(screen.getByText(info.name)).toBeInTheDocument();
    expect(screen.getByText(info.email)).toBeInTheDocument();
    expect(screen.getByText(info.country)).toBeInTheDocument();
    expect(screen.getByText(`${info.gender} (${info.age})`)).toBeInTheDocument();

    const avatar = screen.getByRole('img');
    expect(avatar).toHaveAttribute('src', info.avatar);
  });
});
