'use client';

import { useTheme } from '@/components/ThemeProvider/ThemeContext';
import { IconDarkTheme, IconLightTheme } from '@common/constants';
import type { JSX } from 'react';
import styles from './ThemeSwitcher.module.scss';

export const ICON_DARK_SIZE = 18;
export const ICON_LIGHT_SIZE = 28;

export const ThemeSwitcher = (): JSX.Element => {
  const { theme, setTheme } = useTheme();

  return (
    <div className={styles.switcher}>
      <button
        className={styles.btn}
        onClick={() => {
          setTheme(theme === 'dark' ? 'light' : 'dark');
        }}
      >
        {theme === 'light' ? (
          <IconDarkTheme size={ICON_DARK_SIZE} role='img' />
        ) : (
          <IconLightTheme size={ICON_LIGHT_SIZE} role='img' />
        )}
      </button>
    </div>
  );
};
