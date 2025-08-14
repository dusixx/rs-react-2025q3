import type { ReactNode } from 'react';
import type { CharacterInfo } from 'src/redux/api/api.types.ts';
import { TestId } from 'src/test-utils/constants.ts';
import styles from './Description.module.scss';
import { createDescription } from './Description.utils.ts';

export const EPISODES_DATA_ATTR = 'data-episodes';
const EPISODES_ATTRIBUTES = {
  [EPISODES_DATA_ATTR]: true,
  'data-testid': TestId.DetailedCardEpisode,
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
  return (
    <ul data-testid={TestId.DetailedCardDesc} className={styles.desc}>
      {items}
    </ul>
  );
};
