import { RoutePath } from '@common/constants';
import { ThemeSwitcher } from '@components/ThemeSwitcher/ThemeSwitcher.tsx';
import type { JSX } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { TestId } from 'src/test-utils/constants.ts';
import styles from './Header.module.scss';

export const BTN_ABOUT_TEXT = 'About';
const LOGO_PATH = '/icons.svg#rm-logo';

export const Header = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header data-testid={TestId.Header} className={styles.header}>
      <NavLink data-testid={TestId.HeaderLogo} className={styles.logo} to={RoutePath.Home}>
        <svg data-testid={TestId.HeaderLogoImage}>
          <use href={LOGO_PATH}></use>
        </svg>
      </NavLink>
      <div className={styles.group}>
        <button
          className={styles.btn}
          onClick={() => void navigate(RoutePath.About)}
          disabled={location.pathname === RoutePath.About}
        >
          {BTN_ABOUT_TEXT}
        </button>
        <ThemeSwitcher />
      </div>
    </header>
  );
};
