import type { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTHOR_LINK_PROPS, COURSE_LINK_PROPS } from './AboutPage.constants.ts';
import styles from './AboutPage.module.scss';

export default function AboutPage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <span>
          Made by <a {...AUTHOR_LINK_PROPS}>dusixx</a>
        </span>
        <span>
          as part of the <a {...COURSE_LINK_PROPS}>React Course</a> at RSSchool
        </span>
      </div>
      <button className={styles.btn} onClick={() => void navigate(-1)}>
        Go Back
      </button>
    </div>
  );
}
