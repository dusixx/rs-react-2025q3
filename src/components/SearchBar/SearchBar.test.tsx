import { render } from '@testing-library/react';
import { FAKE_VALUE } from 'src/test-utils/constants.ts';
import {
  changeInput,
  clickElement,
  getElementsByKeys,
  getNestedChild,
  queryNestedChild,
} from 'src/test-utils/index.ts';
import { vi } from 'vitest';
import { SearchBar } from './SearchBar.tsx';

describe('SearchBar', () => {
  it(`Renders search input and search button`, () => {
    render(<SearchBar />);
    expect(getNestedChild('SearchBarBtn', 'SearchBarBtnIcon')).toBeInTheDocument();
  });

  it(`Renders clear button for non-empty search input`, () => {
    render(<SearchBar value={FAKE_VALUE} />);
    expect(getNestedChild('SearchBarClear', 'SearchBarClearIcon')).toBeInTheDocument();
  });

  it(`Renders no clear button for empty search input`, () => {
    render(<SearchBar />);
    expect(queryNestedChild('SearchBarClear')).toBeNull();
  });

  it(`Renders empty search input on clear click`, () => {
    const handleChangeMock = vi.fn();
    render(<SearchBar value={FAKE_VALUE} onChange={handleChangeMock} />);
    clickElement(getNestedChild('SearchBarClear'));
    expect(getNestedChild('SearchBarInput')).toHaveValue('');
    expect(handleChangeMock).toHaveBeenCalledWith('');
  });

  it(`Renders search input placeholder`, () => {
    render(<SearchBar placeholder={FAKE_VALUE} />);
    expect(getNestedChild<HTMLInputElement>('SearchBarInput').placeholder).toBe(FAKE_VALUE);
  });

  it(`Updates input value and enables search button when user types`, () => {
    render(<SearchBar />);

    const [searchBtn, searchInput] = getElementsByKeys('SearchBarBtn', 'SearchBarInput');
    expect(searchBtn).toHaveAttribute('disabled');
    changeInput(searchInput, FAKE_VALUE);
    expect(searchInput).toHaveValue(FAKE_VALUE);
    expect(searchBtn).not.toHaveAttribute('disabled');
  });

  it(`Trims whitespace from search input`, () => {
    render(<SearchBar value={`\t${FAKE_VALUE}\t`} />);

    const [searchBtn, searchInput] = getElementsByKeys('SearchBarBtn', 'SearchBarInput');
    clickElement(searchBtn);
    expect(searchInput).toHaveValue(FAKE_VALUE);
  });

  it(`Triggers search callback with correct parameters`, () => {
    const handleQueryMock = vi.fn();
    render(<SearchBar onQuery={handleQueryMock} value={FAKE_VALUE} />);

    clickElement(getNestedChild('SearchBarBtn'));
    expect(handleQueryMock).toHaveBeenCalledWith(FAKE_VALUE);
  });

  it(`Triggers change callback with correct parameters`, () => {
    const handleChangeMock = vi.fn();
    render(<SearchBar onChange={handleChangeMock} />);

    changeInput(getNestedChild('SearchBarInput'), FAKE_VALUE);
    expect(handleChangeMock).toHaveBeenCalledWith(FAKE_VALUE);
  });
});
