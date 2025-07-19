import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { getNestedChild } from 'src/test-utils/index.ts';
import { Layout } from './Layout.tsx';

describe('Layout', () => {
  it(`Renders layout sections`, () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>,
    );
    expect(getNestedChild('Header')).toBeInTheDocument();
    expect(getNestedChild('Footer')).toBeInTheDocument();
    expect(getNestedChild('Main')).toBeInTheDocument();
  });
});
