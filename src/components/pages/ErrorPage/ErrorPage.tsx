import { RoutePath } from '@/common/constants/index.ts';
import { NavButton } from '@/components/NavButton/NavButton.tsx';
import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';
import styles from './ErrorPage.module.scss';

const HEADING_404 = '404';

export default async function ErrorPage(): Promise<ReactNode> {
  const t = await getTranslations();
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>{HEADING_404}</h1>
      <span className={styles.message}>{t('ErrorPage.NotFound')}</span>
      <NavButton href={RoutePath.Home} text={t('Button.Home')} className={styles.btn} />
    </div>
  );
}
