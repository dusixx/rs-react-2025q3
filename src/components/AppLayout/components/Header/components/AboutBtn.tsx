'use client';

import { RoutePath } from '@/common/constants/index.ts';
import { usePathname, useRouter } from '@/i18n/navigation.ts';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import styles from '../Header.module.scss';

export const AboutBtn = (): ReactNode => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();
  return (
    <button
      className={styles.btn}
      onClick={() => {
        router.push(RoutePath.About);
      }}
      disabled={pathname === RoutePath.About}
    >
      {t('Button.About')}
    </button>
  );
};
