import type { JSX } from 'react';
import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('@pages/HomePage/HomePage.tsx'));

export class App extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  public render(): JSX.Element {
    return (
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
      </Routes>
    );
  }
}
