/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ErrorBoundary, ErrorFallback } from '@components/ErrorBoundary/index.ts';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './components/App/App.tsx';
import { store } from './redux/store.ts';
import './styles/global.scss';

const ROOT_SELECTOR = '#root';

createRoot(document.querySelector(ROOT_SELECTOR)!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
);
