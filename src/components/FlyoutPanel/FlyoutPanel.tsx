'use client';

import type { DownloadInit } from '@components/DownloadLink/DownloadLink.tsx';
import { DownloadLink } from '@components/DownloadLink/DownloadLink.tsx';
import { useTranslations } from 'next-intl';
import { useCallback, type ReactNode } from 'react';
import { clearInfos } from 'src/redux/store/charactersSlice.ts';
import { useAppDispatch, useSelectedInfos } from 'src/redux/store/hooks.ts';
import styles from './FlyoutPanel.module.scss';
import { getDownloadInitProps } from './FlyoutPanel.utils.ts';

export const FlyoutPanel = (): ReactNode => {
  const dispatch = useAppDispatch();
  const selectedInfos = Object.values(useSelectedInfos() ?? {});
  const t = useTranslations();

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
    <div className={styles.panel}>
      <div className={styles['inner-wrapper']}>
        <span>
          {t('FlyoutPanel.TotalSelected')}: <b>{selectedInfos.length}</b>
        </span>
        <div className={styles.group}>
          <button className={styles.btn} type='button' onClick={() => dispatch(clearInfos())}>
            {t('Button.Unselect')}
          </button>
          <DownloadLink onClick={handleDownloadClick} />
        </div>
      </div>
    </div>
  );
};
