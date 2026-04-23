import type { DownloadLinkProps } from '@components/DownloadLink/DownloadLink.tsx';
import type { JSX } from 'react';
import { vi } from 'vitest';

export const initDownloadMock = vi.fn();

vi.mock('@components/DownloadLink/DownloadLink.tsx', () => {
  return {
    DownloadLink: ({ onClick }: DownloadLinkProps): JSX.Element => {
      const handleClick = (): void => {
        onClick?.(initDownloadMock);
      };
      return <a onClick={handleClick} role='link'></a>;
    },
  };
});
