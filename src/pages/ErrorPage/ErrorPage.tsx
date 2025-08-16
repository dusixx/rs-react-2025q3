import { RoutePath } from '@/common/constants/index.ts';
import { NavButton } from '@/components/NavButton/NavButton.tsx';
import type { ReactNode } from 'react';
import styles from './ErrorPage.module.scss';

export const HEADING_404 = '404';
export const TEXT_404 = 'Page not found';
const BTN_TEXT = 'Go Home';

export default function ErrorPage(): ReactNode {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>{HEADING_404}</h1>
      <span className={styles.message}>{TEXT_404}</span>
      <NavButton href={RoutePath.Home} text={BTN_TEXT} className={styles.btn} />
    </div>
  );
}
