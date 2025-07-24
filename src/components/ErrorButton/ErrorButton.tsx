import { ERR_SOMETHING_WRONG } from '@common/constants.ts';
import type { ReactNode } from 'react';
import { Component } from 'react';
import { TestId } from 'src/test-utils/constants.ts';
import styles from './ErrorButton.module.scss';

const ERROR_BTN_TEXT = 'error button';

type ErrorButtonProps = {
  errorMessage?: string;
};

type ErrorButtonState = {
  error?: Error;
};

export class ErrorButton extends Component<ErrorButtonProps> {
  public state: ErrorButtonState = {};

  private handleClick = (): void => {
    this.setState({
      error: Error(this.props.errorMessage || ERR_SOMETHING_WRONG),
    });
  };

  public render(): ReactNode {
    if (this.state.error) {
      throw this.state.error;
    }
    return (
      <button data-testid={TestId.ErrorBtn} className={styles.errorBtn} onClick={this.handleClick}>
        {ERROR_BTN_TEXT}
      </button>
    );
  }
}
