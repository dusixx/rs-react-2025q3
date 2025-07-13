import { IconFemale, IconLocation, IconMale, IconMaleFemale } from '@common/constants.ts';
import type { CharacterInfo } from '@services/types.ts';
import type { ReactNode } from 'react';
import { Component } from 'react';
import styles from './Card.module.scss';

const ICON_PROPS = {
  size: 16,
  color: 'var(--color-green-gray)',
};

type CardProps = {
  info: CharacterInfo;
};

export class Card extends Component<CardProps> {
  public render(): ReactNode {
    const { name, image, status, gender, species, location } = this.props.info;
    const genderLower = gender.toLowerCase();
    const statusLower = status.toLowerCase();

    const statusIndicatorColor =
      statusLower === 'alive'
        ? 'var(--color-green)'
        : statusLower === 'dead'
          ? 'var(--color-green-gray)'
          : 'var(--color-violet-light)';

    const genderIcon =
      genderLower === 'female' ? (
        <IconFemale {...ICON_PROPS} />
      ) : genderLower === 'male' ? (
        <IconMale {...ICON_PROPS} />
      ) : (
        <IconMaleFemale {...ICON_PROPS} />
      );

    return (
      <div className={styles.card}>
        <div className={styles.thumb}>
          {image && <img className={styles.image} src={image} alt={name} />}
        </div>
        <ul className={styles.desc}>
          <li data-name>
            <p>{name}</p>
          </li>
          <li data-status>
            <div style={{ backgroundColor: statusIndicatorColor }}></div>
            <span>{status}</span>
          </li>
          <li data-species>
            {genderIcon}
            <span>{species}</span>
          </li>
          <li data-location>
            <IconLocation {...ICON_PROPS} />
            <p>{location.name.replace(/\s+\(.+/, '')}</p>
          </li>
        </ul>
      </div>
    );
  }
}
