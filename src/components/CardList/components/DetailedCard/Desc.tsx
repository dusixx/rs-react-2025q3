import type { CharacterInfo } from '@services/api.types.ts';
import type { ReactNode } from 'react';
import { UNKNOWN_VALUE } from '../Card/Card.tsx';
import { getEpisodes, getLocationName, trimBracketsWithContent } from '../Card/Card.utils.ts';
import styles from './DetailedCard.module.scss';

type DescProps = {
  info: CharacterInfo;
};

export const Desc = ({ info }: DescProps): ReactNode => {
  const items = Object.keys(info).map(key => {
    let value = trimBracketsWithContent(String(info[key]));

    if (key === 'location' || key === 'origin') {
      value = getLocationName(info[key], UNKNOWN_VALUE);
    } else if (key === 'episode') {
      value = info[key] ? getEpisodes(info[key]).join(', ') : UNKNOWN_VALUE;
    } else if (key === 'created' || key === 'image' || key === 'url') {
      return;
    }
    const dataEpisodesAttr =
      key === 'episode' && info[key] && info[key].length > 1 ? { ['data-episodes']: true } : {};

    return (
      <li className={styles.item} key={key} {...dataEpisodesAttr}>
        <b>{key}:</b>
        <span>{value || UNKNOWN_VALUE}</span>
      </li>
    );
  });
  return <ul className={styles.desc}>{items}</ul>;
};
