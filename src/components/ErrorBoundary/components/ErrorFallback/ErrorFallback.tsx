import { ERR_SOMETHING_WRONG, IconCloseCircleOutline } from '@common/constants.ts';
import type { ErrorInfo, JSX } from 'react';
import { TestId } from 'src/test-utils/constants.ts';
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
    <div data-testid={TestId.ErrorFallback} className={styles.wrapper}>
      <pre className={styles.errorInfo}>
        <div data-testid={TestId.ErrorFallbackHeading} className={styles.errorHeading}>
          <IconCloseCircleOutline data-testid={TestId.ErrorFallbackIcon} {...ICON_PROPS} />
          <b
            data-testid={TestId.ErrorFallbackMessage}
          >{`Error: ${error?.message || ERR_SOMETHING_WRONG}`}</b>
        </div>
        {errorInfo && <p data-testid={TestId.ErrorFallbackStack}>{errorInfo.componentStack}</p>}
      </pre>
      {resetErrorBoundary && (
        <button
          data-testid={TestId.ErrorFallbackResetBtn}
          className={styles.resetBtn}
          onClick={resetErrorBoundary}
        >
          {RESET_BTN_TEXT}
        </button>
      )}
    </div>
  );
};
