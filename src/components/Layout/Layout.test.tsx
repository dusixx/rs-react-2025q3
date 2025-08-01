import { render } from '@testing-library/react';
import { getNestedChild } from 'src/test-utils/index.ts';
import { ProvidersMock } from 'src/test-utils/mocks/provider-mock.tsx';
import { Layout } from './Layout.tsx';

describe('Layout', () => {
  it(`Renders layout sections`, () => {
    render(<Layout />, { wrapper: ProvidersMock });

    expect(getNestedChild('Header')).toBeInTheDocument();
    expect(getNestedChild('Footer')).toBeInTheDocument();
    expect(getNestedChild('Main')).toBeInTheDocument();
  });
});
