import { RoutePath } from '@common/constants';
import type { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ErrorPage.module.scss';

export const HEADING_404 = '404';
export const TEXT_404 = 'Page not found';
const BTN_TEXT = 'Go Home';

export default function ErrorPage(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <h1 data-logo>{HEADING_404}</h1>
      <span data-text>{TEXT_404}</span>
      <button
        className={styles.btn}
        onClick={() => void navigate(RoutePath.Home, { replace: true })}
      >
        {BTN_TEXT}
      </button>
    </div>
  );
}
