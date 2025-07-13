import { RoutePath } from '@common/constants.ts';
import type { ReactNode } from 'react';
import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

const ERROR_BTN_TEXT = 'error button';
const ERR_FAKE = 'Fake critical error';
const LOGO_SRC = '/logo.png';
const LOGO_ALT = 'rick and morty logo';

type HeaderState = {
  error?: Error;
};

export class Header extends Component<object, HeaderState> {
  constructor(props: object) {
    super(props);
    this.state = {
      error: undefined,
    };
  }
  private handleErrorBtnClick = (): void => {
    this.setState({ error: new Error(ERR_FAKE) });
  };

  public render(): ReactNode {
    if (this.state.error) {
      throw this.state.error;
    }
    return (
      <header className={styles.header}>
        <NavLink className={styles.logo} to={RoutePath.Home}>
          <img src={LOGO_SRC} alt={LOGO_ALT} width={32} />
          <div data-logo-text>
            <span>Character</span>
            <b>Finder</b>
          </div>
        </NavLink>
        <button className={styles.errorBtn} onClick={this.handleErrorBtnClick}>
          {ERROR_BTN_TEXT}
        </button>
      </header>
    );
  }
}
