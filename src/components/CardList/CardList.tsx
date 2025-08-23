import { useUsers } from '@/redux/hooks.ts';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import { TestId } from 'src/test-utils/constants.ts';
import styles from './CardList.module.scss';
import { Card } from './components/Card.tsx';

type CardListProps = {
  className?: string;
};

export const CardList = ({ className }: CardListProps): ReactNode => {
  const users = useUsers();
  return (
    <ul data-testid={TestId.CardList} className={clsx(styles.list, className)}>
      {Object.values(users).map(info => (
        <Card userInfo={info} key={info.email} className={styles.card} />
      ))}
    </ul>
  );
};
