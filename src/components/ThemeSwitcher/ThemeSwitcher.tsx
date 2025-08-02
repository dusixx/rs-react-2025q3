import { IconDarkTheme, IconLightTheme } from '@common/constants.ts';
import type { JSX } from 'react';
import { useTheme } from 'src/providers/ThemeProvider/ThemeContext.ts';
import { TestId } from 'src/test-utils/constants.ts';
import styles from './ThemeSwitcher.module.scss';

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
        {theme === 'light' ? <IconDarkTheme size={18} /> : <IconLightTheme size={28} />}
      </button>
    </div>
  );
};
