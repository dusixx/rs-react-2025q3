import { Header } from '@components/Layout/components/Header/Header';
import type { JSX } from 'react';
import { Outlet } from 'react-router-dom';
import { TestId } from 'src/test-utils/constants.ts';
import { Footer } from './components/Footer/Footer.tsx';

export const Layout = (): JSX.Element => {
  return (
    <>
      <Header />
      <main data-testid={TestId.Main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
