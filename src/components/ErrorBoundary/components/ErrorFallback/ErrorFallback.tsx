import { IconCloseCircleOutline } from '@common/constants.ts';
import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';
import { TestId } from 'src/test-utils/constants.ts';
import styles from './ErrorFallback.module.scss';

const RESET_BTN_TEXT = 'Reset error';
const ICON_PROPS = {
  size: 16,
  color: 'var(--color-accent)',
};

export type ErrorFallbackProps = {
  error: Error;
  errorInfo?: ErrorInfo;
  resetErrorBoundary: () => void;
};

export class ErrorFallback extends Component<ErrorFallbackProps> {
  public render(): ReactNode {
    const { error, errorInfo, resetErrorBoundary } = this.props;

    return (
      <div data-testid={TestId.ErrorFallback} className={styles.wrapper}>
        <pre className={styles.errorInfo}>
          <div className={styles.errorHeading}>
            <IconCloseCircleOutline {...ICON_PROPS} />
            <b>{`Error: ${error.message}`}</b>
          </div>
          {errorInfo?.componentStack}
        </pre>
        <button
          data-testid={TestId.ErrorFallbackResetBtn}
          className={styles.resetBtn}
          onClick={resetErrorBoundary}
        >
          {RESET_BTN_TEXT}
        </button>
      </div>
    );
  }
}
