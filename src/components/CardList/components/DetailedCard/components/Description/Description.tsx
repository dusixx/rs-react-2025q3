import { UNKNOWN } from '@common/constants.ts';
import type { CharacterInfo } from '@services/api.types.ts';
import { isObject } from '@utils/type-guards.ts';
import type { ReactNode } from 'react';
import { TestId } from 'src/test-utils/constants.ts';
import { getEpisodes, getLocationName, trimBracketsWithContent } from '../../../Card/Card.utils.ts';
import styles from './Description.module.scss';

export const EPISODES_DATA_ATTR = 'data-episodes';

type DescriptionProps = {
  info: CharacterInfo;
};

export const Description = ({ info }: DescriptionProps): ReactNode => {
  const items = Object.keys(info).map(key => {
    let value =
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      info[key] && !isObject(info[key]) ? trimBracketsWithContent(String(info[key])) : UNKNOWN;

    if (key === 'location' || key === 'origin') {
      value = getLocationName(info[key], UNKNOWN);
    } else if (key === 'episode') {
      value = info[key] ? getEpisodes(info[key]).join(', ') : UNKNOWN;
    } else if (key === 'created' || key === 'image' || key === 'url') {
      return;
    }
    const dataEpisodesAttr =
      key === 'episode' && info[key] && info[key].length > 1
        ? { [EPISODES_DATA_ATTR]: true, 'data-testid': TestId.DetailedCardEpisode }
        : {};

    return (
      <li className={styles.item} key={key} {...dataEpisodesAttr}>
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
