'use client';

import { IconDownload } from '@/common/constants/icons.ts';
import { useTranslations } from 'next-intl';
import { type ReactNode } from 'react';
import { clearInfos } from 'src/redux/store/charactersSlice.ts';
import { useAppDispatch, useSelectedInfos } from 'src/redux/store/hooks.ts';
import styles from './FlyoutPanel.module.scss';
import { saveInfosToCSVFile } from './FlyoutPanel.utils.ts';

const ICON_SIZE = 16;

export const FlyoutPanel = (): ReactNode => {
  const dispatch = useAppDispatch();
  const selectedInfos = Object.values(useSelectedInfos() ?? {});
  const t = useTranslations();

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
          <button
            className={styles.btn}
            type='button'
            style={{ backgroundColor: 'var(--color-accent)' }}
            onClick={() => {
              void saveInfosToCSVFile(selectedInfos);
            }}
          >
            <IconDownload size={ICON_SIZE} role='img' />
            {t('Button.Download')}
          </button>
        </div>
      </div>
    </div>
  );
};
