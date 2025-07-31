import { render } from '@testing-library/react';
import { FAKE_VALUE } from 'src/test-utils/constants.ts';
import {
  changeInput,
  clickElement,
  getNestedChild,
  queryNestedChild,
} from 'src/test-utils/index.ts';
import { vi } from 'vitest';
import { SearchBar } from './SearchBar.tsx';

describe('SearchBar', () => {
  it(`Renders search input and search button`, () => {
    render(<SearchBar value='' placeholder={FAKE_VALUE} />);
    expect(getNestedChild('SearchBarBtn', 'SearchBarBtnIcon')).toBeInTheDocument();
    expect(getNestedChild('SearchBarInput')).toHaveProperty('placeholder', FAKE_VALUE);
    expect(queryNestedChild('SearchBarClear')).toBeNull();
  });

  it(`Triggers search callback with correct parameters`, () => {
    const handleSubmit = vi.fn();
    render(<SearchBar onSubmit={handleSubmit} value={FAKE_VALUE} />);
    expect(getNestedChild('SearchBarClear', 'SearchBarClearIcon')).toBeInTheDocument();
    clickElement(getNestedChild('SearchBarBtn'));
    expect(handleSubmit).toHaveBeenCalledWith(FAKE_VALUE);
  });

  it(`Triggers change callback with correct parameters`, () => {
    const handleChangeMock = vi.fn();
    render(<SearchBar onChange={handleChangeMock} value='' />);
    changeInput(getNestedChild('SearchBarInput'), FAKE_VALUE);
    expect(handleChangeMock).toHaveBeenCalledWith(FAKE_VALUE);
  });
});
