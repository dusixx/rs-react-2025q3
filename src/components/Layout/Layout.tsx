import { Header } from '@components/Header/Header.tsx';
import type { ReactNode } from 'react';
import { Component } from 'react';
import { Outlet } from 'react-router-dom';

export class Layout extends Component {
  public render(): ReactNode {
    return (
      <>
        <Header />
        <main>
          <Outlet />
        </main>
        <footer style={{ marginTop: 80 }}></footer>
      </>
    );
  }
}
