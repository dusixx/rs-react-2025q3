import type { ReactNode } from 'react';
import { Component } from 'react';
import styles from './Footer.module.scss';

export class Footer extends Component {
  public render(): ReactNode {
    return (
      <footer className={styles.footer}>
        <a
          className={styles.link}
          href='https://rs.school/courses/reactjs'
          target='_blank'
          rel='noopener noreferrer nofollow'
        >
          <img src='/rss-logo.svg' alt='rss logo' width={30} />
          <span>© 2025 RS School</span>
        </a>
      </footer>
    );
  }
}
