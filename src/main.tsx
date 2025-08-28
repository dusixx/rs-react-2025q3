import { ErrorBoundary, ErrorFallback } from '@components/ErrorBoundary/index.ts';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { getOrCreateElementWithId } from './common/utils/index.ts';
import { App } from './components/App/App.tsx';
import { store } from './redux/store.ts';
import './styles/global.scss';

createRoot(getOrCreateElementWithId('root')).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
);
