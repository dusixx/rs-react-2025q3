import { DownloadLink } from '@components/DownloadLink/DownloadLink.tsx';
import type { CharacterInfo } from '@services/api/api.types';
import type { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearInfos } from 'src/store/charactersSlice.ts';
import type { StoreDispatch, StoreState } from 'src/store/store.ts';
import { TestId } from 'src/test-utils/constants.ts';
import styles from './FlyoutPanel.module.scss';
import { convertInfosToCSV } from './FlyoutPanel.utils.ts';

export const BTN_UNSELECT_TEXT = 'Unselect All';
export const ITEMS_COUNT_LABEl = 'Total selected';
const MIME_TYPE = 'text/csv;charset=utf-8;';

export const FlyoutPanel = (): ReactNode => {
  const dispatch = useDispatch<StoreDispatch>();
  const selectedInfos = useSelector<StoreState, CharacterInfo[]>(
    state => state.selectedCharacters.infos,
  );
  if (!selectedInfos.length) {
    return;
  }
  return (
    <div className={styles.panel} data-testid={TestId.FlyoutPanel}>
      <div className={styles.innerWrapper}>
        <span>
          {ITEMS_COUNT_LABEl}: <b>{selectedInfos.length}</b>
        </span>
        <div className={styles.group}>
          <button className={styles.btn} type='button' onClick={() => dispatch(clearInfos())}>
            {BTN_UNSELECT_TEXT}
          </button>
          <DownloadLink
            content={convertInfosToCSV(selectedInfos)}
            fileName={`${selectedInfos.length.toString()}_items`}
            type={MIME_TYPE}
          />
        </div>
      </div>
    </div>
  );
};
