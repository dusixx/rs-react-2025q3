import type { CharacterInfo } from '@services/api/api.types.ts';
import clsx from 'clsx';
import type { JSX } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addInfo, removeInfo } from 'src/store/charactersSlice.ts';
import type { StoreDispatch, StoreState } from 'src/store/store.ts';
import { TestId } from 'src/test-utils/constants.ts';
import styles from './CardList.module.scss';
import { Card } from './components/Card/Card.tsx';

type CardListProps = {
  infos: CharacterInfo[];
  onItemClick?: (id: number) => void;
  className?: string;
};

export const CardList = ({ infos, onItemClick, className }: CardListProps): JSX.Element => {
  const dispatch = useDispatch<StoreDispatch>();
  const selectedInfos = useSelector<StoreState, CharacterInfo[]>(
    state => state.selectedCharacters.infos,
  );
  const isSelected = ({ id }: CharacterInfo): boolean => {
    return Boolean(selectedInfos.find(info => info.id === id));
  };
  const handleSelect = (info: CharacterInfo): void => {
    dispatch(isSelected(info) ? removeInfo(info) : addInfo(info));
  };
  return (
    <ul data-testid={TestId.CardList} className={clsx(styles.list, className)}>
      {infos.map(info => (
        <Card
          info={info}
          key={info.id}
          onClick={onItemClick}
          onSelect={handleSelect}
          selected={isSelected(info)}
        />
      ))}
    </ul>
  );
};
