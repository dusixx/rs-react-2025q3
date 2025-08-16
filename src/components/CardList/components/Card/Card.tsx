import { IconLocation, UNKNOWN } from '@common/constants/index.ts';
import { AddToFav } from '@components/CardList/components/Card/components/AddToFav/AddToFav.tsx';
import clsx from 'clsx';
import { type JSX, type SyntheticEvent } from 'react';
import type { CharacterInfo } from 'src/redux/api/api.types.ts';
import styles from './Card.module.scss';
import {
  getGenderIcon,
  getLocationName,
  getStatusIndicatorStyle,
  getThumbStyle,
} from './Card.utils.ts';

const ICON_PROPS = {
  size: 16,
  color: 'var(--color-green-gray)',
};

type CardProps = {
  info: CharacterInfo;
  onClick?: (id: number) => void;
  className?: string;
};

export const Card = ({ info, onClick, className }: CardProps): JSX.Element => {
  const {
    id,
    image,
    location,
    name = UNKNOWN,
    status = UNKNOWN,
    gender = UNKNOWN,
    species = UNKNOWN,
  } = info;

  const handleCardClick = ({ target }: SyntheticEvent): void => {
    if (target instanceof Element && target.closest('[data-name=addtofav]')) {
      return;
    }
    onClick?.(id);
  };
  const IconGender = getGenderIcon(gender);

  return (
    <article className={clsx(styles.card, className)} onClick={handleCardClick}>
      <div className={styles.thumb} style={getThumbStyle(image)}>
        {image && <img className={styles.image} src={image} alt={name} />}
      </div>
      <ul className={styles.desc}>
        <li>
          <AddToFav info={info} data-name='addtofav' />
        </li>
        <li className={styles['name-item']}>
          <p>{name}</p>
        </li>
        <li className={styles['status-item']}>
          <div style={getStatusIndicatorStyle(status)}></div>
          <span>{status}</span>
        </li>
        <li>
          <IconGender {...ICON_PROPS} />
          <span>{species}</span>
        </li>
        <li>
          <IconLocation {...ICON_PROPS} />
          <p>{getLocationName(location) || UNKNOWN}</p>
        </li>
      </ul>
    </article>
  );
};
