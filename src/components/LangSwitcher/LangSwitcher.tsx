'use client';

import { AppLocales } from '@/common/constants/index.ts';
import { usePathname, useRouter } from '@/i18n/navigation.ts';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import type { ReactNode } from 'react';
import styles from './LangSwitcher.module.scss';

const getLocale = (locale: string, upperCase?: boolean): string => {
  const result = locale === AppLocales.EN ? AppLocales.RU : AppLocales.EN;
  return upperCase ? result.toLocaleUpperCase() : result;
};

export const LangSwitcher = (): ReactNode => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const toggleLang = (): void => {
    router.replace(
      { pathname, query: Object.fromEntries(searchParams.entries()) },
      { locale: getLocale(locale) },
    );
  };
  return (
    <button className={styles.btn} type='button' onClick={toggleLang}>
      {getLocale(locale, true)}
    </button>
  );
};
