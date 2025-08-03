import { render, screen } from '@testing-library/react';
import { clearInfos } from 'src/store/charactersSlice.ts';
import { clickElement, queryNestedChild } from 'src/test-utils/index.ts';
import { getCharacterInfoListMock } from 'src/test-utils/mocks/character-mock.ts';
import { ProvidersMock } from 'src/test-utils/mocks/provider-mock.tsx';
import { dispatchMock, mockUseSelector } from 'src/test-utils/mocks/redux-mock.ts';
import { URLMock } from 'src/test-utils/mocks/url-mock.ts';
import { vi } from 'vitest';
import { BTN_UNSELECT_TEXT, FlyoutPanel, ITEMS_COUNT_LABEl } from './FlyoutPanel.tsx';

const ITEMS_COUNT = 10;

describe('FlyoutPanel', () => {
  URLMock.revokeObjectURL = vi.fn();

  it(`Renders flyout panel and handles buttons clicks correctly`, () => {
    const infos = getCharacterInfoListMock(ITEMS_COUNT, ITEMS_COUNT);
    vi.mocked(mockUseSelector).mockReturnValueOnce(infos);
    render(<FlyoutPanel />, { wrapper: ProvidersMock });

    expect(mockUseSelector).toHaveBeenCalled();
    expect(screen.getByText(RegExp(ITEMS_COUNT_LABEl, 'i'))).toHaveTextContent(
      ITEMS_COUNT.toString(),
    );
    expect(screen.getByRole('link')).toBeInTheDocument();

    clickElement(screen.getByText(BTN_UNSELECT_TEXT));
    expect(dispatchMock).toHaveBeenCalledWith({
      payload: undefined,
      type: clearInfos.type,
    });
  });

  it('Renders no flyout panel if no data is provided', () => {
    vi.mocked(mockUseSelector).mockReturnValueOnce([]);
    render(<FlyoutPanel />, { wrapper: ProvidersMock });
    expect(queryNestedChild('FlyoutPanel')).toBeNull();
  });
});
