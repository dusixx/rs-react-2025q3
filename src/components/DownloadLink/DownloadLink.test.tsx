/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { act, render, screen } from '@testing-library/react';
import { clickElement, FAKE_VALUE } from 'src/test-utils/index.ts';
import { BlobMock, URLMock } from 'src/test-utils/mocks/url-mock.ts';
import { vi } from 'vitest';
import type { DownloadInit } from './DownloadLink.tsx';
import { DEFAULT_TEXT, DownloadLink } from './DownloadLink.tsx';

describe('DownloadLink', () => {
  const { createObjectURL, revokeObjectURL } = URLMock;

  it(`Renders link correctly`, () => {
    const text = crypto.randomUUID();
    const { rerender } = render(
      <DownloadLink>
        <img src={FAKE_VALUE} />
        {text}
      </DownloadLink>,
    );
    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', FAKE_VALUE);

    rerender(<DownloadLink />);
    expect(screen.getByText(DEFAULT_TEXT)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it(`Handles click correctly`, async () => {
    const blob = {};
    const handleClick = vi.fn(() => {});
    const setTimeoutMock = vi.spyOn(global, 'setTimeout');

    vi.mocked(BlobMock).mockReturnValueOnce(blob);
    vi.mocked(createObjectURL).mockReturnValueOnce(FAKE_VALUE);
    render(<DownloadLink onClick={handleClick} />);

    clickElement(screen.getByRole('link'));
    expect(handleClick).toHaveBeenCalled();
    expect(setTimeoutMock).toHaveBeenCalled();
    const initDownload = (handleClick.mock.calls[0] as DownloadInit[])[0];
    act(() => {
      initDownload({
        content: FAKE_VALUE,
        type: FAKE_VALUE,
      });
    });
    expect(BlobMock).toHaveBeenCalledWith([FAKE_VALUE], { type: FAKE_VALUE });
    expect(createObjectURL).toHaveBeenCalledWith(blob);
    await act(() => vi.runAllTimers());
    expect(revokeObjectURL).toHaveBeenCalledWith(FAKE_VALUE);
  });
});
