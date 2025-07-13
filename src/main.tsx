import { TOASTS_PROPS } from '@common/constants.ts';
import { ErrorBoundary, ErrorFallback } from '@components/ErrorBoundary/index.ts';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { App } from './components/App/App.tsx';
import './styles/global.scss';

const ROOT_SELECTOR = '#root';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.querySelector(ROOT_SELECTOR)!).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
    <ToastContainer {...TOASTS_PROPS} />
  </StrictMode>,
);
