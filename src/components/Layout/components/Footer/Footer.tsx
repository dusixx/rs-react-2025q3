import type { JSX } from 'react';
import { TestId } from 'src/test-utils/constants.ts';
import { COPYRIGHT, IMAGE_PROPS, LINK_PROPS } from './Footer.constants.ts';
import styles from './Footer.module.scss';

export const Footer = (): JSX.Element => {
  return (
    <footer data-testid={TestId.Footer} className={styles.footer}>
      <a data-testid={TestId.FooterLink} className={styles.link} {...LINK_PROPS}>
        <img className={styles.logo} data-testid={TestId.FooterLogo} {...IMAGE_PROPS} />
        <span>{COPYRIGHT}</span>
      </a>
    </footer>
  );
};
