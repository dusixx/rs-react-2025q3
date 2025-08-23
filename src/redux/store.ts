import { configureStore } from '@reduxjs/toolkit';
import countriesSlice from './countriesSlice.ts';
import usersSlice from './usersSlice.ts';

export const store = configureStore({
  reducer: {
    users: usersSlice,
    countries: countriesSlice,
  },
});
export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
