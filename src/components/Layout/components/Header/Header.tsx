'use client';

import { Link, usePathname, useRouter } from '@/i18n/navigation.ts';
import { RoutePath } from '@common/constants';
import { ThemeSwitcher } from '@components/ThemeSwitcher/ThemeSwitcher.tsx';
import type { JSX } from 'react';
import styles from './Header.module.scss';

export const BTN_ABOUT_TEXT = 'About';
const LOGO_PATH = '/icons.svg#rm-logo';

export const Header = (): JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <Link className={styles.logo} href={RoutePath.Home}>
        <svg>
          <use href={LOGO_PATH}></use>
        </svg>
      </Link>
      <div className={styles.group}>
        <button
          className={styles.btn}
          onClick={() => {
            router.push(RoutePath.About);
          }}
          disabled={pathname === RoutePath.About}
        >
          {BTN_ABOUT_TEXT}
        </button>
        <ThemeSwitcher />
      </div>
    </header>
  );
};
