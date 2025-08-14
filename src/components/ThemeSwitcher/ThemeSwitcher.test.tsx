import { LocalStorageKey } from '@common/constants/index.ts';
import { render, screen } from '@testing-library/react';
import { localStorageMock } from 'src/test-utils/mocks/local-storage-mock.ts';
import { ProvidersMock } from 'src/test-utils/mocks/provider-mock.tsx';
import { clickElement } from 'src/test-utils/utils.ts';
import { ThemeSwitcher } from './ThemeSwitcher.tsx';

const { setItem, getItem } = localStorageMock;

describe('ThemeSwitcher', () => {
  it(`Renders correctly`, () => {
    setItem(LocalStorageKey.Theme, 'dark');
    render(<ThemeSwitcher />, { wrapper: ProvidersMock });

    expect(getItem).toHaveBeenCalledWith(LocalStorageKey.Theme);
    expect(getItem).toHaveReturnedWith('dark');

    const btn = screen.getByRole('button');
    clickElement(btn);
    expect(setItem).toHaveBeenCalledWith(LocalStorageKey.Theme, 'light');
    clickElement(btn);
    expect(setItem).toHaveBeenCalledWith(LocalStorageKey.Theme, 'dark');
  });
});
