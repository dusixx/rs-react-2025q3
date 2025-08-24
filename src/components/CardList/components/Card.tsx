import { IconFemale, IconMale } from '@/common/constants.ts';
import type { User } from '@/redux/user.ts';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './Card.module.scss';

type CardProps = {
  userInfo: User;
  className?: string;
};
const AVATAR_ALT = 'user avatar';
const ICON_PROPS = {
  size: 16,
};

export const Card = ({ userInfo, className }: CardProps): ReactNode => {
  const { name, email, gender, country, avatar, age } = userInfo;
  const Icon = gender === 'male' ? IconMale : IconFemale;

  return (
    <article className={clsx(styles.card, className)}>
      <div className={styles.thumb}>
        <img className={styles.image} src={avatar} alt={AVATAR_ALT} />
      </div>
      <ul className={styles.desc}>
        <li>{name}</li>
        <li>{email}</li>
        <li className={styles.gender}>
          {<Icon {...ICON_PROPS} />}
          <span>
            {gender} ({age})
          </span>
        </li>
        <li>{country}</li>
      </ul>
    </article>
  );
};
