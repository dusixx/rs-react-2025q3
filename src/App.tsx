import { RoutePath } from '@common/constants.ts';
import { Layout } from '@components/Layout/Layout.tsx';
import MainPage from '@pages/MainPage/MainPage.tsx';
import type { ReactNode } from 'react';
import { Component } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

export class App extends Component {
  public render(): ReactNode {
    return (
      <Routes>
        <Route path={RoutePath.Home} element={<Layout />}>
          <Route path={RoutePath.Home} element={<MainPage />} />
          <Route path={RoutePath.Error} element={<Navigate to={RoutePath.Home} />} />
        </Route>
      </Routes>
    );
  }
}
