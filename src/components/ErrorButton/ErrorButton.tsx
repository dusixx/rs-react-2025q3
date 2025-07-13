import type { ReactNode } from 'react';
import { Component } from 'react';
import styles from './ErrorButton.module.scss';

const ERROR_BTN_TEXT = 'error button';
const FAKE_ERROR_MESSAGE = 'Fake critical error';

type ErrorButtonState = {
  error?: Error;
};

export class ErrorButton extends Component<object, ErrorButtonState> {
  constructor(props: object) {
    super(props);
    this.state = {
      error: undefined,
    };
  }

  private handleErrorBtnClick = (): void => {
    this.setState({ error: new Error(FAKE_ERROR_MESSAGE) });
  };

  public render(): ReactNode {
    if (this.state.error) {
      throw this.state.error;
    }
    return (
      <button className={styles.errorBtn} onClick={this.handleErrorBtnClick}>
        {ERROR_BTN_TEXT}
      </button>
    );
  }
}
