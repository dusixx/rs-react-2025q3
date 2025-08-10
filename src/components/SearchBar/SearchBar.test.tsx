import { INITIAL_PAGE, LocalStorageKey } from '@common/constants/index.ts';
import { render, screen } from '@testing-library/react';
import { FAKE_VALUE } from 'src/test-utils/constants.ts';
import { changeInput, clickElement, getNestedChild } from 'src/test-utils/index.ts';
import { localStorageMock } from 'src/test-utils/mocks/local-storage-mock.ts';
import { mockUseAppCustomSearchResult } from 'src/test-utils/mocks/mockUseCustomSearchParams.ts';
import { ProvidersMock } from 'src/test-utils/mocks/provider-mock.tsx';
import { expect, vi } from 'vitest';
import { SearchBar } from './SearchBar.tsx';

describe('SearchBar', () => {
  const { createParams, getParams } = mockUseAppCustomSearchResult;
  const { setItem } = localStorageMock;

  it(`Functions correctly`, () => {
    const handleSubmit = vi.fn();
    vi.mocked(getParams)?.mockReturnValueOnce([FAKE_VALUE]);

    render(<SearchBar onSubmit={handleSubmit} placeholder={FAKE_VALUE} />, {
      wrapper: ProvidersMock,
    });
    expect(setItem).toHaveBeenCalledWith(LocalStorageKey.LastQuery, FAKE_VALUE);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue(FAKE_VALUE);
    expect(input).toHaveProperty('placeholder', FAKE_VALUE);
    changeInput(input, `\t${FAKE_VALUE}\t`);

    const submitBtn = getNestedChild('SearchBarBtn');
    clickElement(submitBtn);
    expect(createParams).toHaveBeenCalledWith({ q: FAKE_VALUE, page: INITIAL_PAGE });
    expect(handleSubmit).toHaveBeenCalledWith(FAKE_VALUE);

    const clearBtn = getNestedChild('SearchBarClear');
    clickElement(clearBtn);
    expect(input).toHaveValue('');
    expect(handleSubmit).toHaveBeenCalledWith('');
    expect(setItem).toHaveBeenCalledWith(LocalStorageKey.LastQuery, '');
    expect(createParams).toHaveBeenCalledWith({ q: '', page: INITIAL_PAGE });
  });
});
