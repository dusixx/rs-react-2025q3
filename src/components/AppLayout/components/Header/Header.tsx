import { LangSwitcher } from '@/components/LangSwitcher/LangSwitcher.tsx';
import { Link } from '@/i18n/navigation.ts';
import { RoutePath } from '@common/constants';
import { ThemeSwitcher } from '@components/ThemeSwitcher/ThemeSwitcher.tsx';
import type { ReactNode } from 'react';
import { AboutBtn } from './components/AboutBtn.tsx';
import { Hint } from './components/Hint.tsx';
import styles from './Header.module.scss';

const LOGO_PATH = '/icons.svg#rm-logo';

export const Header = (): ReactNode => {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} href={RoutePath.Home}>
        <svg>
          <use href={LOGO_PATH}></use>
        </svg>
      </Link>
      <Hint />
      <div className={styles.group}>
        <AboutBtn />
        <LangSwitcher />
        <ThemeSwitcher />
      </div>
    </header>
  );
};
