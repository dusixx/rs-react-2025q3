import { render, screen } from '@testing-library/react';
import { addInfo, removeInfo } from 'src/redux/store/charactersSlice.ts';
import { clickElement, FAKE_VALUE } from 'src/test-utils/index.ts';
import { characterMock } from 'src/test-utils/mocks/character-mock.ts';
import { ProvidersMock } from 'src/test-utils/mocks/provider-mock.tsx';
import { appDispatchMock, mockUseSelectedInfos } from 'src/test-utils/mocks/redux-hook-mock.ts';
import { vi } from 'vitest';
import { AddToFav } from './AddToFav.tsx';

describe('AddToFav', () => {
  it(`Functions correctly`, () => {
    vi.mocked(mockUseSelectedInfos).mockReturnValueOnce({ [characterMock.id]: characterMock });
    render(<AddToFav info={characterMock} data-test={FAKE_VALUE} id={FAKE_VALUE} />, {
      wrapper: ProvidersMock,
    });
    const btn = screen.getByRole('checkbox');
    expect(btn).toHaveAttribute('data-test', FAKE_VALUE);
    expect(btn).toHaveAttribute('id', FAKE_VALUE);

    clickElement(btn);
    expect(appDispatchMock).toHaveBeenCalledWith({
      payload: characterMock,
      type: removeInfo.type,
    });
    clickElement(btn);
    expect(appDispatchMock).toHaveBeenCalledWith({
      payload: characterMock,
      type: addInfo.type,
    });
  });
});
