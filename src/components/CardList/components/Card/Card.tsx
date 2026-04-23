import { IconLocation, UNKNOWN } from '@common/constants.ts';
import { Checkbox } from '@components/Checkbox/Checkbox.tsx';
import type { CharacterInfo } from '@services/api/api.types.ts';
import clsx from 'clsx';
import { type JSX, type SyntheticEvent } from 'react';
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
  onSelect?: (info: CharacterInfo) => void;
  selected?: boolean;
  className?: string;
};

export const Card = ({ info, onClick, onSelect, selected, className }: CardProps): JSX.Element => {
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
    if (target instanceof Element && target.closest('[data-checkbox]')) {
      return;
    }
    onClick?.(id);
  };
  const handleChange = (): void => {
    onSelect?.(info);
  };
  const IconGender = getGenderIcon(gender);

  return (
    <article className={clsx(styles.card, className)} onClick={handleCardClick}>
      <div data-testid={TestId.CardThumb} className={styles.thumb} style={getThumbStyle(image)}>
        {image && (
          <img data-testid={TestId.CardImage} className={styles.image} src={image} alt={name} />
        )}
      </div>
      <ul className={styles.desc}>
        <li>
          <Checkbox data-checkbox onChange={handleChange} checked={selected} />
        </li>
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
