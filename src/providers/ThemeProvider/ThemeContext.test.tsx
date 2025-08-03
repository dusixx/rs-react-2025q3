import { render } from '@testing-library/react';
import type { ReactNode } from 'react';
import { ERR_USE_OUTSIDE_CONTEXT, useTheme } from './ThemeContext.ts';

const Mocked = (): ReactNode => {
  useTheme();
  return;
};
describe('ErrorPage', () => {
  it(`Throws error when called outside ThemeProvider`, () => {
    expect(() => render(<Mocked />)).toThrow(Error(ERR_USE_OUTSIDE_CONTEXT));
  });
});
