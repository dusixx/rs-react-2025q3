import { IconDownload } from '@common/constants.ts';
import type { PropsWithChildren } from 'react';
import { useEffect, useState, type JSX } from 'react';
import styles from './DownloadLink.module.scss';

type DownloadLinkProps = {
  content: BlobPart;
  fileName?: string;
  type?: string;
} & PropsWithChildren;

const DefaultOptions = {
  Text: 'Download',
  Type: 'text/plain;charset=utf-8;',
  FileName: crypto.randomUUID().replace(/-/g, ''),
};
const ICON_SIZE = 16;

export const DownloadLink = ({
  content,
  fileName = DefaultOptions.FileName,
  type = DefaultOptions.Type,
  children,
}: DownloadLinkProps): JSX.Element => {
  const [url, setUrl] = useState('');
  const [download, setDownload] = useState(fileName);

  useEffect(() => {
    return (): void => {
      URL.revokeObjectURL(url);
    };
  }, [url]);

  const handleClick = (): void => {
    setUrl(URL.createObjectURL(new Blob([content], { type })));
    setDownload(fileName);
  };
  return (
    <a className={styles.btn} href={url} download={download} onClick={handleClick} role='link'>
      {children ? (
        children
      ) : (
        <>
          <IconDownload size={ICON_SIZE} role='img' />
          {DefaultOptions.Text}
        </>
      )}
    </a>
  );
};
