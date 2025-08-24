import type { User } from '@/redux/user.ts';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import { TestId } from 'src/test-utils/constants.ts';
import styles from './CardList.module.scss';
import { Card } from './components/Card.tsx';

type CardListProps = {
  className?: string;
  users: Record<string, User>;
};
export const CardList = ({ className, users }: CardListProps): ReactNode => {
  return (
    <ul data-testid={TestId.CardList} className={clsx(styles.list, className)}>
      {Object.values(users).map(info => (
        <Card userInfo={info} key={info.email} className={styles.card} />
      ))}
    </ul>
  );
};
