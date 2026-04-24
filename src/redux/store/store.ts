import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import selectedCharactersSlice from './charactersSlice.ts';

export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    selectedCharacters: selectedCharactersSlice,
  },
});
setupListeners(store.dispatch);
