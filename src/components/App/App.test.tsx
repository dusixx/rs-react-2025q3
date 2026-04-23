import { render } from '@testing-library/react';
import { getNestedChild } from 'src/test-utils/index.ts';
import { ProvidersMock } from 'src/test-utils/mocks/provider-mock.tsx';
import { App } from './App.tsx';

describe('App', () => {
  it(`Renders home page content`, () => {
    render(<App />, { wrapper: ProvidersMock });
    expect(getNestedChild('MainPage')).toBeInTheDocument();
  });
});
