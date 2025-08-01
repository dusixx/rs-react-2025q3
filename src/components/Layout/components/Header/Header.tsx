import { RoutePath } from '@common/constants.ts';
import { ThemeSwitcher } from '@components/ThemeSwitcher/ThemeSwitcher.tsx';
import type { JSX } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { TestId } from 'src/test-utils/constants.ts';
import { IMAGE_PROPS } from './Header.constants.ts';
import styles from './Header.module.scss';

export const BTN_ABOUT_TEXT = 'About';

export const Header = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header data-testid={TestId.Header} className={styles.header}>
      <NavLink data-testid={TestId.HeaderLogo} className={styles.logo} to={RoutePath.Home}>
        <img data-testid={TestId.HeaderLogoImage} {...IMAGE_PROPS} />
        <div data-logo-text>
          <span>R&M Character</span>
          <b>Finder</b>
        </div>
      </NavLink>
      <div className={styles.group}>
        <ThemeSwitcher />
        <button
          className={styles.btn}
          onClick={() => void navigate(RoutePath.About)}
          disabled={location.pathname === RoutePath.About}
        >
          {BTN_ABOUT_TEXT}
        </button>
      </div>
    </header>
  );
};
