import { IconCloseCircleOutline } from '@common/constants.ts';
import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';
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
  private resetError = (): void => {
    this.props.resetErrorBoundary();
  };

  public render(): ReactNode {
    const { error, errorInfo } = this.props;
    const errInfo = (
      <>
        <div className={styles['error-heading']}>
          <IconCloseCircleOutline {...ICON_PROPS} />
          <b>{`Error: ${error.message}`}</b>
        </div>
        <div>{errorInfo?.componentStack}</div>
      </>
    );
    return (
      <div className={styles.wrapper}>
        <pre className={styles.errorInfo}>{errInfo}</pre>
        <button className={styles.resetBtn} onClick={this.resetError}>
          {RESET_BTN_TEXT}
        </button>
      </div>
    );
  }
}
