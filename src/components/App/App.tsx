import { RoutePath } from '@common/constants.ts';
import { Layout } from '@components/Layout/Layout.tsx';
import type { JSX } from 'react';
import { lazy, PureComponent } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const MainPage = lazy(() => import('@pages/MainPage/MainPage.tsx'));

export class App extends PureComponent {
  public render(): JSX.Element {
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
