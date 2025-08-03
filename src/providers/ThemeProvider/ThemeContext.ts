import { createContext, useContext } from 'react';

export const ERR_USE_OUTSIDE_CONTEXT =
  'useTheme() may be used only in the context of a <ThemeProvider> component';

export type Theme = 'dark' | 'light';
export type ThemeContextProps = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};
export const ThemeContext = createContext<ThemeContextProps | null>(null);

export const useTheme = (): ThemeContextProps => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error(ERR_USE_OUTSIDE_CONTEXT);
  }
  return ctx;
};
