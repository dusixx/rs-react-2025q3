import { LocalStorageKey } from '@common/constants.ts';
import type { JSX, PropsWithChildren } from 'react';
import { useState } from 'react';
import { ThemeContext, type Theme } from './ThemeContext.ts';

const DEFAULT_THEME: Theme = 'light';

const getThemeFromLS = (): Theme => {
  const persisted = localStorage.getItem(LocalStorageKey.Theme);
  return persisted !== 'dark' && persisted !== 'light' ? DEFAULT_THEME : persisted;
};

export const ThemeProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [theme, _setTheme] = useState<Theme>(getThemeFromLS());

  const setTheme = (theme: Theme): void => {
    _setTheme(theme);
    localStorage.setItem(LocalStorageKey.Theme, theme);
  };
  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
};
