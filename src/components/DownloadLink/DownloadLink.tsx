import { IconDownload } from '@common/constants.ts';
import type { PropsWithChildren } from 'react';
import { useCallback, useEffect, useState, type JSX } from 'react';
import styles from './DownloadLink.module.scss';

export const DEFAULT_TEXT = 'Download';
export const DEFAULT_TYPE = 'text/plain;charset=utf-8;';
const DEFAULT_FILENAME = crypto.randomUUID().replace(/-/g, '').slice(0, 10);
const ICON_SIZE = 16;

export type DownloadInitProps = {
  content?: BlobPart;
  fileName?: string;
  type?: string;
};
export type DownloadInit = (props: DownloadInitProps) => void;

export type DownloadLinkProps = PropsWithChildren & {
  onClick?: (init: DownloadInit) => void;
};

export const DownloadLink = ({ onClick, children }: DownloadLinkProps): JSX.Element => {
  const [url, setUrl] = useState<string>();
  const [download, setDownload] = useState<string>();

  useEffect(() => {
    return (): void => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [url]);

  const initDownload: DownloadInit = useCallback(
    ({ content = '', fileName = DEFAULT_FILENAME, type = DEFAULT_TYPE }): void => {
      setUrl(URL.createObjectURL(new Blob([content], { type })));
      setDownload(fileName);
    },
    [],
  );
  const resetState = (): void => {
    setTimeout(() => {
      setUrl(undefined);
      setDownload(undefined);
    });
  };
  const handleClick = (): void => {
    onClick?.(initDownload);
    resetState();
  };
  return (
    <a className={styles.btn} href={url} download={download} onClick={handleClick} role='link'>
      {children ? (
        children
      ) : (
        <>
          <IconDownload size={ICON_SIZE} role='img' />
          {DEFAULT_TEXT}
        </>
      )}
    </a>
  );
};
