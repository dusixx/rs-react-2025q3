import type { DownloadInit } from '@components/DownloadLink/DownloadLink.tsx';
import { DownloadLink } from '@components/DownloadLink/DownloadLink.tsx';
import { useCallback, type ReactNode } from 'react';
import { clearInfos } from 'src/redux/charactersSlice.ts';
import { useAppDispatch, useSelectedInfos } from 'src/redux/hooks.ts';
import { TestId } from 'src/test-utils/constants.ts';
import styles from './FlyoutPanel.module.scss';
import { getDownloadInitProps } from './FlyoutPanel.utils.ts';

export const BTN_UNSELECT_TEXT = 'Unselect All';
export const ITEMS_COUNT_LABEl = 'Total selected';

export const FlyoutPanel = (): ReactNode => {
  const dispatch = useAppDispatch();
  const selectedInfos = useSelectedInfos();

  const handleDownloadClick = useCallback(
    (initDownload: DownloadInit): void => {
      initDownload(getDownloadInitProps(selectedInfos));
    },
    [selectedInfos],
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
          <DownloadLink onClick={handleDownloadClick} />
        </div>
      </div>
    </div>
  );
};
