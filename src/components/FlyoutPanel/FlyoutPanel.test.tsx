import { render, screen } from '@testing-library/react';
import { clearInfos } from 'src/redux/store/charactersSlice.ts';
import { clickElement, queryNestedChild } from 'src/test-utils/index.ts';
import {
  getCharacterInfoListMock,
  getCharacterInfosMock,
  ITEMS_PER_PAGE,
} from 'src/test-utils/mocks/character-mock.ts';
import { initDownloadMock } from 'src/test-utils/mocks/DownloadLinkMock.tsx';
import { ProvidersMock } from 'src/test-utils/mocks/provider-mock.tsx';
import { appDispatchMock, mockUseSelectedInfos } from 'src/test-utils/mocks/redux-hook-mock.ts';
import { it, vi } from 'vitest';
import { BTN_UNSELECT_TEXT, FlyoutPanel, ITEMS_COUNT_LABEl } from './FlyoutPanel.tsx';
import { getDownloadInitProps } from './FlyoutPanel.utils.ts';

const { array: infosArray, record: infosRecord } = getCharacterInfosMock(ITEMS_PER_PAGE);

describe('FlyoutPanel', () => {
  it(`Handles unselect all clicked correctly`, () => {
    vi.mocked(mockUseSelectedInfos).mockReturnValueOnce(infosRecord);
    render(<FlyoutPanel />, { wrapper: ProvidersMock });

    expect(mockUseSelectedInfos).toHaveBeenCalled();
    expect(screen.getByText(RegExp(ITEMS_COUNT_LABEl, 'i'))).toHaveTextContent(
      ITEMS_PER_PAGE.toString(),
    );
    clickElement(screen.getByText(BTN_UNSELECT_TEXT));
    expect(appDispatchMock).toHaveBeenCalledWith({
      payload: undefined,
      type: clearInfos.type,
    });
  });

  it('Handles download clicked correctly', () => {
    vi.mocked(mockUseSelectedInfos).mockReturnValueOnce(infosRecord);
    render(<FlyoutPanel />);

    const downloadButton = screen.getByRole('link');
    clickElement(downloadButton);
    expect(initDownloadMock).toHaveBeenCalledWith(getDownloadInitProps(infosArray));
  });

  it('Renders no flyout panel if no data is provided', () => {
    vi.mocked(mockUseSelectedInfos).mockReturnValueOnce(undefined);
    render(<FlyoutPanel />, { wrapper: ProvidersMock });
    expect(queryNestedChild('FlyoutPanel')).toBeNull();
  });
});
