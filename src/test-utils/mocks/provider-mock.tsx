import type { JSX, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'src/providers/ThemeProvider/ThemeProvider.tsx';
import { store } from 'src/redux/store/store';

export const ProvidersMock = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <MemoryRouter>
      <Provider store={store}>
        <ThemeProvider>{children}</ThemeProvider>
      </Provider>
    </MemoryRouter>
  );
};
