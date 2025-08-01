import { IconDarkTheme, IconLightTheme } from '@common/constants.ts';
import clsx from 'clsx';
import type { JSX } from 'react';
import { useTheme } from 'src/providers/ThemeProvider/ThemeContext.ts';
import { TestId } from 'src/test-utils/constants.ts';
import styles from './ThemeSwitcher.module.scss';

const ICON_SIZE = 16;

export const ThemeSwitcher = (): JSX.Element => {
  const { theme, setTheme } = useTheme();
  return (
    <div className={styles.switcher} data-testid={TestId.ThemeSwitcher}>
      <button className={clsx(styles.btn, theme === 'light' && styles.active)}>
        <IconLightTheme
          size={ICON_SIZE}
          onClick={() => {
            setTheme('light');
          }}
        />
      </button>
      <button
        className={clsx(styles.btn, theme === 'dark' && styles.active)}
        onClick={() => {
          setTheme('dark');
        }}
      >
        <IconDarkTheme size={ICON_SIZE} />
      </button>
    </div>
  );
};
