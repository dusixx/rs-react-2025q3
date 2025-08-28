import { configureStore } from '@reduxjs/toolkit';
import usersSlice from './usersSlice.ts';

export const store = configureStore({
  reducer: {
    users: usersSlice,
  },
});
export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
