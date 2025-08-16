import clsx from 'clsx';
import type { JSX } from 'react';
import type { CharacterInfo } from 'src/redux/api/api.types.ts';
import styles from './CardList.module.scss';
import { Card } from './components/Card/Card.tsx';

type CardListProps = {
  infos: CharacterInfo[];
  onItemClick?: (id: number) => void;
  className?: string;
};

export const CardList = ({ infos, onItemClick, className }: CardListProps): JSX.Element => {
  return (
    <ul className={clsx(styles.list, className)}>
      {infos.map(info => (
        <Card info={info} key={info.id} onClick={onItemClick} />
      ))}
    </ul>
  );
};
