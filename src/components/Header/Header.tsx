import { RoutePath } from '@common/constants.ts';
import { ErrorButton } from '@components/ErrorButton/ErrorButton.tsx';
import type { ReactNode } from 'react';
import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

const LOGO_SRC = '/logo.png';
const LOGO_ALT = 'rick and morty logo';

export class Header extends Component {
  public render(): ReactNode {
    return (
      <header className={styles.header}>
        <NavLink className={styles.logo} to={RoutePath.Home}>
          <img src={LOGO_SRC} alt={LOGO_ALT} width={32} />
          <div data-logo-text>
            <span>R&M Character</span>
            <b>Finder</b>
          </div>
        </NavLink>
        <ErrorButton />
      </header>
    );
  }
}
