import { mockUseUserList } from '@/test-utils/mocks/redux-hook-mock.ts';
import { USERS_COUNT, usersMock } from '@/test-utils/mocks/user-mock.ts';
import { render, screen } from '@testing-library/react';
import { clickElement, getNestedChild, queryNestedChild } from 'src/test-utils/index.ts';
import { ProvidersMock } from 'src/test-utils/mocks/provider-mock.tsx';
import { vi } from 'vitest';
import MainPage, { CONTROLLED_TEXT, UNCONTROLLED_TEXT } from './MainPage.tsx';

vi.mocked(mockUseUserList).mockReturnValue(usersMock);
window.scrollTo = vi.fn();

describe('MainPage', () => {
  it(`Renders correctly`, () => {
    render(<MainPage />, { wrapper: ProvidersMock });

    expect(getNestedChild('MainPage')).toBeInTheDocument();

    const btnControlled = screen.getByText(CONTROLLED_TEXT);
    const btnUncontrolled = screen.getByText(UNCONTROLLED_TEXT);
    expect(btnControlled).toBeInstanceOf(HTMLButtonElement);
    expect(btnUncontrolled).toBeInstanceOf(HTMLButtonElement);

    expect(getNestedChild('CardList')).toHaveProperty('children.length', USERS_COUNT);
    expect(queryNestedChild('ModalBackdrop')).toBeNull();
    expect(queryNestedChild('FormControlled')).toBeNull();
    expect(queryNestedChild('FormUncontrolled')).toBeNull();

    clickElement(btnControlled);
    expect(getNestedChild('FormControlled')).toBeInTheDocument();

    clickElement(btnUncontrolled);
    expect(getNestedChild('FormUncontrolled')).toBeInTheDocument();

    expect(getNestedChild('ModalBackdrop')).toBeInTheDocument();
  });
});
