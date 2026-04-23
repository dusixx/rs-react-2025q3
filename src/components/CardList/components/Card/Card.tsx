import { IconLocation, UNKNOWN } from '@common/constants.ts';
import type { CharacterInfo } from '@services/api.types.ts';
import clsx from 'clsx';
import type { JSX } from 'react';
import { TestId } from 'src/test-utils/constants.ts';
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

  const IconGender = getGenderIcon(gender);

  return (
    <article className={clsx(styles.card, className)} onClick={() => onClick?.(id)}>
      <div data-testid={TestId.CardThumb} className={styles.thumb} style={getThumbStyle(image)}>
        {image && (
          <img data-testid={TestId.CardImage} className={styles.image} src={image} alt={name} />
        )}
      </div>
      <ul className={styles.desc}>
        <li data-name>
          <p data-testid={TestId.CardName}>{name}</p>
        </li>
        <li data-status>
          <div
            data-testid={TestId.CardStatusIndicator}
            style={getStatusIndicatorStyle(status)}
          ></div>
          <span data-testid={TestId.CardStatus}>{status}</span>
        </li>
        <li data-species>
          <IconGender data-testid={TestId.CardIconGender} {...ICON_PROPS} />
          <span data-testid={TestId.CardSpecies}>{species}</span>
        </li>
        <li data-location>
          <IconLocation data-testid={TestId.CardIconLocation} {...ICON_PROPS} />
          <p data-testid={TestId.CardLocation}>{getLocationName(location) || UNKNOWN}</p>
        </li>
      </ul>
    </article>
  );
};
