import { LocalStorageKey } from '@common/constants.ts';
import { render, screen } from '@testing-library/react';
import { localStorageMock } from 'src/test-utils/mocks/local-storage-mock.ts';
import { ProvidersMock } from 'src/test-utils/mocks/provider-mock.tsx';
import { clickElement } from 'src/test-utils/utils.ts';
import { ICON_DARK_SIZE, ICON_LIGHT_SIZE, ThemeSwitcher } from './ThemeSwitcher.tsx';

describe('ThemeSwitcher', () => {
  const { setItem, getItem } = localStorageMock;

  it(`Renders correctly`, () => {
    setItem(LocalStorageKey.Theme, 'dark');
    render(<ThemeSwitcher />, { wrapper: ProvidersMock });

    const btn = screen.getByRole('button');
    expect(getItem).toHaveBeenCalledWith(LocalStorageKey.Theme);
    expect(screen.getByRole('img')).toHaveAttribute('width', ICON_LIGHT_SIZE.toString());

    clickElement(btn);
    expect(setItem).toHaveBeenCalledWith(LocalStorageKey.Theme, 'light');
    expect(screen.getByRole('img')).toHaveAttribute('width', ICON_DARK_SIZE.toString());
  });
});
