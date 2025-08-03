import { render, screen } from '@testing-library/react';
import { clickElement, FAKE_VALUE } from 'src/test-utils/index.ts';
import { BlobMock, URLMock } from 'src/test-utils/mocks/url-mock.ts';
import { vi } from 'vitest';
import { DownloadLink } from './DownloadLink.tsx';

describe('DownloadLink', () => {
  it(`Renders download link correctly`, () => {
    const blob = {};
    const text = crypto.randomUUID();
    const { createObjectURL, revokeObjectURL } = URLMock;
    render(
      <DownloadLink content={FAKE_VALUE} type={FAKE_VALUE} fileName={FAKE_VALUE}>
        <img src={FAKE_VALUE} />
        {text}
      </DownloadLink>,
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('download', FAKE_VALUE);
    expect(link).toHaveTextContent(text);
    expect(screen.getByRole('img')).toHaveAttribute('src', FAKE_VALUE);

    vi.mocked(BlobMock).mockReturnValue(blob);
    clickElement(link);

    expect(BlobMock).toHaveBeenCalledWith([FAKE_VALUE], { type: FAKE_VALUE });
    expect(createObjectURL).toHaveBeenCalledWith(blob);
    expect(revokeObjectURL).toHaveBeenCalledWith('');
  });
});
