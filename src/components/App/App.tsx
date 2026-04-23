import { lazy, Suspense, type ReactNode } from 'react';
import { MemoizedLoader } from '../Loader/Loader.tsx';

const MemoizedMainPage = lazy(() => import('@pages/MainPage/MainPage.tsx'));

export const App = (): ReactNode => {
  return (
    <Suspense fallback={<MemoizedLoader size={28}>Loading data, please wait...</MemoizedLoader>}>
      <MemoizedMainPage />
    </Suspense>
  );
};
