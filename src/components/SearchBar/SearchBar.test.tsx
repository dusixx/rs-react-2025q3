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
    render(<SearchBar value='' />);
    expect(getNestedChild('SearchBarBtn', 'SearchBarBtnIcon')).toBeInTheDocument();
  });

  it(`Renders clear button for non-empty search input`, () => {
    render(<SearchBar value={FAKE_VALUE} />);
    expect(getNestedChild('SearchBarClear', 'SearchBarClearIcon')).toBeInTheDocument();
  });

  it(`Renders no clear button for empty search input`, () => {
    render(<SearchBar value='' />);
    expect(queryNestedChild('SearchBarClear')).toBeNull();
  });

  it(`Renders search input placeholder`, () => {
    render(<SearchBar placeholder={FAKE_VALUE} value='' />);
    expect(getNestedChild('SearchBarInput')).toHaveProperty('placeholder', FAKE_VALUE);
  });

  it(`Triggers search callback with correct parameters`, () => {
    const handleSubmit = vi.fn();
    render(<SearchBar onSubmit={handleSubmit} value={FAKE_VALUE} />);

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
