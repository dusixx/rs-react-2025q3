import { lazy, Suspense, type ReactNode } from 'react';
import { Loader } from '../Loader/Loader.tsx';

const MainPage = lazy(() => import('@pages/MainPage/MainPage.tsx'));

export const App = (): ReactNode => {
  return (
    <Suspense fallback={<Loader />}>
      <MainPage />
    </Suspense>
  );
};
