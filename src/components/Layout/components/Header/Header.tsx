import { RoutePath } from '@common/constants.ts';
import { ErrorButton } from '@components/ErrorButton/ErrorButton.tsx';
import type { ReactNode } from 'react';
import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

const IMAGE_PROPS = {
  src: '/logo.png',
  alt: 'rick and morty logo',
  width: 32,
};

export class Header extends Component {
  public render(): ReactNode {
    return (
      <header className={styles.header}>
        <NavLink className={styles.logo} to={RoutePath.Home}>
          <img {...IMAGE_PROPS} />
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
