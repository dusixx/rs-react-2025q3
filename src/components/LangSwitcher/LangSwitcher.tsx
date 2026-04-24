'use client';

import { AppLocales } from '@/common/constants/index.ts';
import { useAppCustomSearchParams } from '@/hooks/useAppCustomSearchParams.ts';
import { usePathname, useRouter } from '@/i18n/navigation.ts';
import { useLocale } from 'next-intl';
import { useTransition, type ReactNode } from 'react';
import styles from './LangSwitcher.module.scss';

const getLocale = (locale: string, upperCase?: boolean): string => {
  const result = locale === AppLocales.EN ? AppLocales.RU : AppLocales.EN;
  return upperCase ? result.toLocaleUpperCase() : result;
};

export const LangSwitcher = (): ReactNode => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { getQueryParams } = useAppCustomSearchParams();
  const [isPending, startTransition] = useTransition();

  const toggleLang = (): void => {
    startTransition(() => {
      router.replace({ pathname, query: getQueryParams() }, { locale: getLocale(locale) });
    });
  };
  return (
    <button className={styles.btn} type='button' onClick={toggleLang} disabled={isPending}>
      {getLocale(locale, true)}
    </button>
  );
};
