import { render } from '@testing-library/react';
import { TEST_VALUE } from 'src/test-utils/constants.ts';
import {
  changeInput,
  clickButton,
  getElementsByIds,
  getNestedChildById,
  queryNestedChildById,
} from 'src/test-utils/utils.ts';
import { vi } from 'vitest';
import { SearchBar } from './SearchBar.tsx';

describe('SearchBar', () => {
  it(`Renders search input and search button`, () => {
    render(<SearchBar />);
    expect(getNestedChildById('SearchBarBtn', 'SearchBarBtnIcon')).toBeInTheDocument();
  });

  it(`Renders clear button for non-empty search input`, () => {
    render(<SearchBar value={TEST_VALUE} />);
    expect(getNestedChildById('SearchBarClear', 'SearchBarClearIcon')).toBeInTheDocument();
  });

  it(`Renders no clear button for empty search input`, () => {
    render(<SearchBar />);
    expect(queryNestedChildById('SearchBarClear')).toBeNull();
  });

  it(`Renders empty search input on clear click`, () => {
    render(<SearchBar value={TEST_VALUE} />);
    clickButton(getNestedChildById('SearchBarClear'));
    expect(getNestedChildById('SearchBarInput')).toHaveValue('');
  });

  it(`Renders search input placeholder`, () => {
    render(<SearchBar placeholder={TEST_VALUE} />);
    expect(getNestedChildById<HTMLInputElement>('SearchBarInput').placeholder).toBe(TEST_VALUE);
  });

  it(`Updates input value and enables search button when user types`, () => {
    render(<SearchBar value='' />);

    const [searchBtn, searchInput] = getElementsByIds('SearchBarBtn', 'SearchBarInput');
    expect(searchBtn).toHaveAttribute('disabled');
    changeInput(searchInput, TEST_VALUE);
    expect(searchInput).toHaveValue(TEST_VALUE);
    expect(searchBtn).not.toHaveAttribute('disabled');
  });

  it(`Trims whitespace from search input`, () => {
    render(<SearchBar value={`\t${TEST_VALUE}\t`} />);

    const [searchBtn, searchInput] = getElementsByIds('SearchBarBtn', 'SearchBarInput');
    clickButton(searchBtn);
    expect(searchInput).toHaveValue(TEST_VALUE);
  });

  it(`Triggers search callback with correct parameters`, () => {
    const handleQueryMock = vi.fn();
    render(<SearchBar onQuery={handleQueryMock} value={TEST_VALUE} />);

    clickButton(getNestedChildById('SearchBarBtn'));
    expect(handleQueryMock).toHaveBeenCalledWith(TEST_VALUE);
  });

  it(`Triggers change callback with correct parameters`, () => {
    const handleChangeMock = vi.fn();
    render(<SearchBar onChange={handleChangeMock} value='' />);

    changeInput(getNestedChildById('SearchBarInput'), TEST_VALUE);
    expect(handleChangeMock).toHaveBeenCalledWith(TEST_VALUE);
  });
});
