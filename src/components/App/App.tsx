import { RoutePath } from '@common/constants.ts';
import { DetailedCard } from '@components/CardList/components/DetailedCard/DetailedCard.tsx';
import { Layout } from '@components/Layout/Layout.tsx';
import AboutPage from '@pages/AboutPage/AboutPage.tsx';
import ErrorPage from '@pages/ErrorPage/ErrorPage.tsx';
import SearchPage from '@pages/SearchPage/SearchPage';
import type { JSX } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

export const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path={RoutePath.Home} element={<Navigate to={RoutePath.Search} replace />} />
      <Route path={RoutePath.Home} element={<Layout />}>
        <Route path={RoutePath.Search} element={<SearchPage />}>
          <Route index element={<DetailedCard />} />
        </Route>
        <Route path={RoutePath.About} element={<AboutPage />} />
        <Route path={RoutePath.All} element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};
