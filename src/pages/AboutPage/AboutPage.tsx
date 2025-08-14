import { LinkProps } from '@common/constants';
import type { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AboutPage.module.scss';

const BTN_TEXT = 'Go Back';
export const AUTHOR_GITHUB_URL = 'https://github.com/dusixx';
export const COURSE_PAGE_URL = 'https://rs.school/courses/reactjs';

export default function AboutPage(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <span>
          Made by{' '}
          <a {...LinkProps} href={AUTHOR_GITHUB_URL}>
            dusixx
          </a>
        </span>
        <span>
          as part of the{' '}
          <a {...LinkProps} href={COURSE_PAGE_URL}>
            React Course
          </a>{' '}
          at RSSchool
        </span>
      </div>
      <button className={styles.btn} onClick={() => void navigate(-1)}>
        {BTN_TEXT}
      </button>
    </div>
  );
}
