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
    expect(getNestedChild('Header', 'ErrorBtn')).toBeInTheDocument();
    expect(getNestedChild('Footer', 'FooterLogo')).toBeInTheDocument();
    expect(getNestedChild('Main', 'SearchPage', 'SearchBar')).toBeInTheDocument();
  });
});
