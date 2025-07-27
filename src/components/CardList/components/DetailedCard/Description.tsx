import { UNKNOWN } from '@common/constants.ts';
import type { CharacterInfo } from '@services/api.types.ts';
import type { ReactNode } from 'react';
import { TestId } from 'src/test-utils/constants.ts';
import { getEpisodes, getLocationName, trimBracketsWithContent } from '../Card/Card.utils.ts';
import styles from './DetailedCard.module.scss';

type DescriptionProps = {
  info: CharacterInfo;
};

export const Description = ({ info }: DescriptionProps): ReactNode => {
  const items = Object.keys(info).map(key => {
    let value = trimBracketsWithContent(String(info[key]));

    if (key === 'location' || key === 'origin') {
      value = getLocationName(info[key], UNKNOWN);
    } else if (key === 'episode') {
      value = info[key] ? getEpisodes(info[key]).join(', ') : UNKNOWN;
    } else if (key === 'created' || key === 'image' || key === 'url') {
      return;
    }
    const dataEpisodesAttr =
      key === 'episode' && info[key] && info[key].length > 1 ? { ['data-episodes']: true } : {};

    return (
      <li className={styles.item} key={key} {...dataEpisodesAttr}>
        <b>{key}:</b>
        <span>{value || UNKNOWN}</span>
      </li>
    );
  });
  return (
    <ul data-testid={TestId.DetailedCardDesc} className={styles.desc}>
      {items}
    </ul>
  );
};
