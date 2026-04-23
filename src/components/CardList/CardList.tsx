import type { CharacterInfo } from '@services/api.types.ts';
import clsx from 'clsx';
import type { JSX } from 'react';
import { TestId } from 'src/test-utils/constants.ts';
import styles from './CardList.module.scss';
import { Card } from './components/Card/Card.tsx';

type CardListProps = {
  infos: CharacterInfo[];
  onItemClick?: (id: number) => void;
  className?: string;
};

export const CardList = ({ infos, onItemClick, className }: CardListProps): JSX.Element => {
  return (
    <ul data-testid={TestId.CardList} className={clsx(styles.list, className)}>
      {infos.map(info => (
        <Card info={info} key={info.id} onClick={onItemClick} />
      ))}
    </ul>
  );
};
