import { RoutePath } from '@/common/constants/index.ts';
import { NavBtn } from '@/components/NavButton/NavBtn';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import styles from './ErrorPage.module.scss';

export default function ErrorPage(): ReactNode {
  const t = useTranslations();
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>404</h1>
      <span className={styles.message}>{t('ErrorPage.NotFound')}</span>
      <NavBtn href={RoutePath.Home} text={t('Button.Home')} className={styles.btn} />
    </div>
  );
}
