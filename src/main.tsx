import { ErrorBoundary, ErrorFallback } from '@components/ErrorBoundary/index.ts';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { getOrCreateElementWithId } from './common/utils/index.ts';
import { App } from './components/App/App.tsx';
import './styles/global.scss';

createRoot(getOrCreateElementWithId('root')).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
