import type { CharacterInfo } from '@/services/api.types.ts';
import type { ReactNode } from 'react';
import styles from './Description.module.scss';
import { createDescription } from './Description.utils.ts';

export const EPISODES_DATA_ATTR = 'data-episodes';
const EPISODES_ATTRIBUTES = {
  [EPISODES_DATA_ATTR]: true,
};

export const Description = ({ info }: { info: CharacterInfo }): ReactNode => {
  const items = Object.entries(createDescription(info)).map(([key, value]) => {
    const episodesAttr = key === 'episode' && value.includes(',') ? EPISODES_ATTRIBUTES : {};
    return (
      <li className={styles.item} key={key} {...episodesAttr}>
        <b>{key}:</b>
        <span>{value}</span>
      </li>
    );
  });
  return <ul className={styles.desc}>{items}</ul>;
};
