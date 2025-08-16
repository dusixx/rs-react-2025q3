'use client';

import { RoutePath } from '@/common/constants/index.ts';
import { redirect } from '@/i18n/navigation.ts';
import { useLocale } from 'next-intl';
import type { JSX } from 'react';
import styles from './ErrorPage.module.scss';

export const HEADING_404 = '404';
export const TEXT_404 = 'Page not found';
const BTN_TEXT = 'Go Home';

export default function ErrorPage(): JSX.Element {
  const locale = useLocale();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>{HEADING_404}</h1>
      <span className={styles.message}>{TEXT_404}</span>
      <button
        className={styles.btn}
        onClick={() => {
          redirect({ href: RoutePath.Home, locale });
        }}
      >
        {BTN_TEXT}
      </button>
    </div>
  );
}
