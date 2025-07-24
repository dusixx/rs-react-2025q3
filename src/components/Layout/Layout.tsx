import { Header } from '@components/Layout/components/Header/Header';
import type { ReactNode } from 'react';
import { Component } from 'react';
import { Outlet } from 'react-router-dom';
import { TestId } from 'src/test-utils/constants.ts';
import { Footer } from './components/Footer/Footer.tsx';

export class Layout extends Component {
  public render(): ReactNode {
    return (
      <>
        <Header />
        <main data-testid={TestId.Main}>
          <Outlet />
        </main>
        <Footer />
      </>
    );
  }
}
