import { RoutePath } from '@common/constants.ts';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { getNestedChild } from 'src/test-utils/index.ts';
import { App } from './App.tsx';

describe('App', () => {
  it(`Renders home page content`, () => {
    render(
      <MemoryRouter initialEntries={[RoutePath.Home]}>
        <App />
      </MemoryRouter>,
    );
    const mainPage = getNestedChild('Main', 'MainPage');
    expect(getNestedChild('Header')).toBeInTheDocument();
    expect(getNestedChild('Footer')).toBeInTheDocument();
    expect(mainPage).toBeInTheDocument();
    expect(getNestedChild(mainPage, 'SearchBar')).toBeInTheDocument();
  });
});
