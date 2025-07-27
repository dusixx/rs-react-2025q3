import { RoutePath } from '@common/constants.ts';
import type { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ErrorPage.module.scss';

export default function ErrorPage(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <h1 data-logo>404</h1>
      <span data-text>Page not found</span>
      <button
        className={styles.btn}
        onClick={() => void navigate(RoutePath.Home, { replace: true })}
      >
        Go Home
      </button>
    </div>
  );
}
