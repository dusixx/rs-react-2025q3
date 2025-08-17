import { AddToFav } from '@/components/CardList/components/Card/components/AddToFav.tsx';
import { IconLocation, UNKNOWN } from '@common/constants/index.ts';
import type { CharacterInfo } from '@services/api.types.ts';
import clsx from 'clsx';
import Image from 'next/image';
import type { ReactNode } from 'react';
import styles from './Card.module.scss';
import {
  getGenderIcon,
  getLocationName,
  getStatusIndicatorStyle,
  getThumbStyle,
} from './Card.utils.ts';
import { CardWrapper } from './components/CardWrapper.tsx';

export const ADD_TO_FAV_ID = 'add-to-fav-button';
const ICON_PROPS = {
  size: 16,
  color: 'var(--color-green-gray)',
};
type CardProps = {
  info: CharacterInfo;
  onClick?: (id: number) => void;
  className?: string;
};

export const Card = ({ info, className }: CardProps): ReactNode => {
  const {
    id,
    image,
    location,
    name = UNKNOWN,
    status = UNKNOWN,
    gender = UNKNOWN,
    species = UNKNOWN,
  } = info;
  const IconGender = getGenderIcon(gender);

  return (
    <CardWrapper className={clsx(styles.card, className)} cardId={id}>
      <div className={styles.thumb} style={getThumbStyle(image)}>
        {image && (
          <Image
            className={styles.image}
            src={image}
            alt={name}
            width={0}
            height={0}
            sizes='100vw'
            style={{ width: '100%', height: 'auto' }}
          />
        )}
      </div>
      <ul className={styles.desc}>
        <li>
          <AddToFav info={info} id={ADD_TO_FAV_ID} />
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
    </CardWrapper>
  );
};
