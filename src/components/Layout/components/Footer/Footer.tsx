import { Link } from '@/i18n/navigation.ts';
import { LINK_PROPS } from '@common/constants';
import Image from 'next/image';
import type { JSX } from 'react';
import styles from './Footer.module.scss';

export const COPYRIGHT = '© 2025 RS School';
export const RSS_URL = 'https://rs.school/';
export const RSS_LOGO_SRC = '/rss-logo.svg';
const RSS_LOGO_ALT = 'RSS logo';

export const Footer = (): JSX.Element => {
  return (
    <footer className={styles.footer}>
      <Link className={styles.link} href={RSS_URL} {...LINK_PROPS}>
        <Image
          className={styles.logo}
          src={RSS_LOGO_SRC}
          alt={RSS_LOGO_ALT}
          width={40}
          height={40}
        />
        <span>{COPYRIGHT}</span>
      </Link>
    </footer>
  );
};
