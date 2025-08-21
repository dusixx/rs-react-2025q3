import { configureStore } from '@reduxjs/toolkit';
import selectedCharactersSlice from './charactersSlice.ts';

export const store = configureStore({
  reducer: {
    selectedCharacters: selectedCharactersSlice,
  },
});
export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
