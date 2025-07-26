import { RoutePath } from '@common/constants.ts';
import { ErrorButton } from '@components/ErrorButton/ErrorButton.tsx';
import type { JSX } from 'react';
import { NavLink } from 'react-router-dom';
import { TestId } from 'src/test-utils/constants.ts';
import styles from './Header.module.scss';

export const IMAGE_PROPS = {
  src: '/logo.png',
  alt: 'rick and morty logo',
  width: 32,
};

export const Header = (): JSX.Element => {
  return (
    <header data-testid={TestId.Header} className={styles.header}>
      <NavLink data-testid={TestId.HeaderLogo} className={styles.logo} to={RoutePath.Home}>
        <img data-testid={TestId.HeaderLogoImage} {...IMAGE_PROPS} />
        <div data-logo-text>
          <span>R&M Character</span>
          <b>Finder</b>
        </div>
      </NavLink>
      <ErrorButton />
    </header>
  );
};
