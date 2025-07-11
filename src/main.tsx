import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { App } from './App.tsx';
import './index.css';
import './styles/reset.scss';

const ROOT_SELECTOR = '#root';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.querySelector(ROOT_SELECTOR)!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>

    <ToastContainer autoClose={1500} position='top-center' hideProgressBar={true} />
  </StrictMode>,
);
