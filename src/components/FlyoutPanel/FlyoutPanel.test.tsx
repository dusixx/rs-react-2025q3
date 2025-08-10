import { render, screen } from '@testing-library/react';
import { clearInfos } from 'src/redux/store/charactersSlice.ts';
import { clickElement, queryNestedChild } from 'src/test-utils/index.ts';
import { getCharacterInfoListMock } from 'src/test-utils/mocks/character-mock.ts';
import { initDownloadMock } from 'src/test-utils/mocks/DownloadLinkMock.tsx';
import { ProvidersMock } from 'src/test-utils/mocks/provider-mock.tsx';
import { appDispatchMock, mockUseSelectedInfos } from 'src/test-utils/mocks/redux-hook-mock.ts';
import { it, vi } from 'vitest';
import { BTN_UNSELECT_TEXT, FlyoutPanel, ITEMS_COUNT_LABEl } from './FlyoutPanel.tsx';
import { getDownloadInitProps } from './FlyoutPanel.utils.ts';

const ITEMS_COUNT = 10;

describe('FlyoutPanel', () => {
  it(`Handles unselect all clicked correctly`, () => {
    const infos = getCharacterInfoListMock(ITEMS_COUNT);
    vi.mocked(mockUseSelectedInfos).mockReturnValueOnce(infos);
    render(<FlyoutPanel />, { wrapper: ProvidersMock });

    expect(mockUseSelectedInfos).toHaveBeenCalled();
    expect(screen.getByText(RegExp(ITEMS_COUNT_LABEl, 'i'))).toHaveTextContent(
      ITEMS_COUNT.toString(),
    );
    clickElement(screen.getByText(BTN_UNSELECT_TEXT));
    expect(appDispatchMock).toHaveBeenCalledWith({
      payload: undefined,
      type: clearInfos.type,
    });
  });

  it('Handles download clicked correctly', () => {
    const infos = getCharacterInfoListMock(ITEMS_COUNT);
    vi.mocked(mockUseSelectedInfos).mockReturnValueOnce(infos);
    render(<FlyoutPanel />);

    const downloadButton = screen.getByRole('link');
    clickElement(downloadButton);
    expect(initDownloadMock).toHaveBeenCalledWith(getDownloadInitProps(infos));
  });

  it('Renders no flyout panel if no data is provided', () => {
    vi.mocked(mockUseSelectedInfos).mockReturnValueOnce([]);
    render(<FlyoutPanel />, { wrapper: ProvidersMock });
    expect(queryNestedChild('FlyoutPanel')).toBeNull();
  });
});
