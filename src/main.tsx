import { ErrorBoundary, ErrorFallback } from '@components/ErrorBoundary/index.ts';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from './components/App/App.tsx';
import { ThemeProvider } from './providers/ThemeProvider/ThemeProvider.tsx';
import { store } from './redux/store.ts';
import './styles/global.scss';

const ROOT_SELECTOR = '#root';

const root = document.querySelector(ROOT_SELECTOR);
if (!root) {
  throw new Error(`Root element with ID ${ROOT_SELECTOR} was not found in the document`);
}

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Provider store={store}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Provider>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
);
