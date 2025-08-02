import { IconDarkTheme, IconLightTheme } from '@common/constants.ts';
import { useTheme } from '@providers/ThemeProvider/ThemeContext.ts';
import type { JSX } from 'react';
import { TestId } from 'src/test-utils/constants.ts';
import styles from './ThemeSwitcher.module.scss';

export const ICON_DARK_SIZE = 18;
export const ICON_LIGHT_SIZE = 28;

export const ThemeSwitcher = (): JSX.Element => {
  const { theme, setTheme } = useTheme();

  return (
    <div className={styles.switcher} data-testid={TestId.ThemeSwitcher}>
      <button
        className={styles.btn}
        onClick={() => {
          setTheme(theme === 'dark' ? 'light' : 'dark');
        }}
      >
        {theme === 'light' ? (
          <IconDarkTheme size={18} role='img' />
        ) : (
          <IconLightTheme size={28} role='img' />
        )}
      </button>
    </div>
  );
};
