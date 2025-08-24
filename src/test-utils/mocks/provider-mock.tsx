import type { JSX, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { store } from 'src/redux/store';

export const ProvidersMock = ({ children }: PropsWithChildren): JSX.Element => {
  return <Provider store={store}>{children}</Provider>;
};
