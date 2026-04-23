import { ERR_SOMETHING_WRONG, IconCloseCircleOutline } from '@common/constants.ts';
import type { ErrorInfo, JSX } from 'react';
import styles from './ErrorFallback.module.scss';

export const RESET_BTN_TEXT = 'Reset error';
const ICON_PROPS = {
  size: 16,
  color: 'var(--color-accent)',
};

export type ErrorFallbackProps = {
  error?: Error;
  errorInfo?: ErrorInfo;
  resetErrorBoundary?: () => void;
};

export const ErrorFallback = ({
  error,
  errorInfo,
  resetErrorBoundary,
}: ErrorFallbackProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <pre className={styles.errorInfo}>
        <div className={styles.errorHeading}>
          <IconCloseCircleOutline {...ICON_PROPS} />
          <b>{`Error: ${error?.message || ERR_SOMETHING_WRONG}`}</b>
        </div>
        {errorInfo && <p>{errorInfo.componentStack}</p>}
      </pre>
      {resetErrorBoundary && (
        <button className={styles.resetBtn} onClick={resetErrorBoundary}>
          {RESET_BTN_TEXT}
        </button>
      )}
    </div>
  );
};
