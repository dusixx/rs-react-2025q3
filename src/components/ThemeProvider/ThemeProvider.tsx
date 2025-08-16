'use client';

import { DARK_THEME_CLASS, LocalStorageKey } from '@common/constants/index.ts';
import { isTheme } from '@utils/type-guards.ts';
import type { JSX, PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';
import { ThemeContext, type Theme } from './ThemeContext.ts';

const getPersistedTheme = (defaultTheme: Theme = 'light'): Theme => {
  const persisted = localStorage.getItem(LocalStorageKey.Theme);
  return isTheme(persisted) ? persisted : defaultTheme;
};

const toggleTheme = (theme: Theme): void => {
  document.documentElement.classList.toggle(DARK_THEME_CLASS, theme === 'dark');
};

export default function ThemeProvider({ children }: PropsWithChildren): JSX.Element {
  const [theme, _setTheme] = useState<Theme>(getPersistedTheme());

  useEffect(() => {
    toggleTheme(theme);
  }, [theme]);

  const setTheme = (theme: Theme): void => {
    _setTheme(theme);
    localStorage.setItem(LocalStorageKey.Theme, theme);
  };
  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
}
