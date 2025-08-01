import { IconDownload } from '@common/constants.ts';
import type { CharacterInfo } from '@services/api/api.types';
import { saveInfosToCSVFile } from '@services/file-saver/file-saver.ts';
import type { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearInfos } from 'src/store/charactersSlice.ts';
import type { StoreDispatch, StoreState } from 'src/store/store.ts';
import { TestId } from 'src/test-utils/constants.ts';
import styles from './FlyoutPanel.module.scss';

export const BTN_DOWNLOAD_TEXT = 'Download';
export const BTN_UNSELECT_TEXT = 'Unselect All';
export const ITEMS_COUNT_LABEl = 'Selected items';
const ICON_SIZE = 16;

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
          <button
            className={styles.btn}
            data-unselect
            type='button'
            onClick={() => dispatch(clearInfos())}
          >
            {BTN_UNSELECT_TEXT}
          </button>
          <button
            className={styles.btn}
            type='button'
            onClick={() => {
              saveInfosToCSVFile(selectedInfos);
            }}
          >
            <IconDownload size={ICON_SIZE} />
            {BTN_DOWNLOAD_TEXT}
          </button>
        </div>
      </div>
    </div>
  );
};
