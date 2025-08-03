import { render } from '@testing-library/react';
import type { ReactNode } from 'react';
import { ERR_USE_OUTSIDE_CONTEXT, useTheme } from './ThemeContext.ts';

const Outsider = (): ReactNode => {
  useTheme();
  return;
};
describe('ErrorPage', () => {
  it(`Throws an error for a component outside of ThemeProvider`, () => {
    expect(() => render(<Outsider />)).toThrow(Error(ERR_USE_OUTSIDE_CONTEXT));
  });
});
