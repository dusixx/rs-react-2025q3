import { renderHook } from '@testing-library/react';
import { ERR_USE_OUTSIDE_CONTEXT, useTheme } from './ThemeContext.ts';

describe('ErrorPage', () => {
  it(`Throws an error for a component outside of ThemeProvider`, () => {
    expect(() => renderHook(useTheme)).toThrow(Error(ERR_USE_OUTSIDE_CONTEXT));
  });
});
