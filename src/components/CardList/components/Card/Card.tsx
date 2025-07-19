import { IconLocation } from '@common/constants.ts';
import type { CharacterInfo } from '@services/types.ts';
import type { ReactNode } from 'react';
import { Component } from 'react';
import { TestId } from 'src/test-utils/constants.ts';
import styles from './Card.module.scss';
import {
  getGenderIcon,
  getLocationName,
  getStatusIndicatorStyle,
  getThumbStyle,
} from './Card.utils.ts';

export const UNKNOWN_VALUE = 'unknown';
const ICON_PROPS = {
  size: 16,
  color: 'var(--color-green-gray)',
};

type CardProps = {
  info: CharacterInfo;
};

export class Card extends Component<CardProps> {
  public render(): ReactNode {
    const {
      image,
      location,
      name = UNKNOWN_VALUE,
      status = UNKNOWN_VALUE,
      gender = UNKNOWN_VALUE,
      species = UNKNOWN_VALUE,
    } = this.props.info;

    const IconGender = getGenderIcon(gender);

    return (
      <div className={styles.card}>
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
            <p data-testid={TestId.CardLocation}>{getLocationName(location) || UNKNOWN_VALUE}</p>
          </li>
        </ul>
      </div>
    );
  }
}
